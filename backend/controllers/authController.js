const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SECRET = process.env.SECRET;

exports.register = async (req, res) => {
  const { email, senha } = req.body;
  const hashedPassword = bcrypt.hashSync(senha, 10);
  const active = true;
  const admin = false;

  try {
    await prisma.users.create({
      data: { email, senha: hashedPassword, active, admin },
    });
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao registrar usuário' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas meu nobre' });
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

// Nova rota para verificar login via cookie
exports.verify = (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.status(200).json({admin: req.isAdmin});
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
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
    sameSite: 'Strict',
  });
  res.status(200).json({ message: 'Logout efetuado com sucesso' });
};
