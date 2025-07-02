const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SECRET = process.env.SECRET;

exports.register = async (req, res) => {
  const { nome,email, senha, observacao } = req.body;
  const hashedPassword = bcrypt.hashSync(senha, 10);
  const active = true;
  const admin = false;
  try {
    await prisma.users.create({
      data: { nome,email, senha: hashedPassword, active, admin, observacao },
    });
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao registrar usuário' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { email:email, active:true} });
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const hashedPassword = bcrypt.compareSync(senha, user.senha);

    if (!hashedPassword && senha != user.senha ) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user.id, admin: user.admin }, SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ admin: user.admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor ao fazer login' });
  }
};

exports.verify = (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.status(200).json({admin: req.isAdmin});
};

exports.getUserById = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!user) return res.status(400).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.mesage });
  }
  
};


exports.updateUser = async (req, res) => {
  try {
    const user = await prisma.users.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({ where: { admin : false, active: true } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

exports.removeUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.users.findUnique({ where: { id: parseInt(id) } });

    if (!user) return res.status(400).json({ error: 'Usuário não encontrado' });
    if (!user.active) return res.status(400).json({ error: 'Usuário já foi excluído' });

    await prisma.users.update({
      where: { id: parseInt(id) },
      data: { active: false },
    });

    res.json({ message: "Usuário excluído com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro interno ao excluir usuário" });
  }
};

exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        path: '/',
    });

    res.status(200).json({ message: 'Logout efetuado com sucesso' });
};