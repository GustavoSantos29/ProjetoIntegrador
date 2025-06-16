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
    const user = await prisma.users.create({
      data: { email, senha: hashedPassword,active,admin},
    });

    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao registrar usuário' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  const user = await prisma.users.findUnique({ where: { email , senha} });

  // if (!user || !bcrypt.compareSync(senha, user.senha)) {
  //   return res.status(401).json({ error: 'Credenciais inválidas meu nobre' });
  // }

  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas meu nobre' });
  }

  const token = jwt.sign({ usersId: user.id }, SECRET, { expiresIn: '1h' });

  res.json({ token });
};

exports.removeUser = async (req, res) => {
 
  const { id } = req.params;

  try {
    const user = await prisma.users.findUnique({ where: { id } });

    if (!user) {
      return res.status(400).json({error: 'Usuário não encontrado'});
    }
    if (!user.active) {
      return res.status(400).json({error: 'Usuário já foi excluído'});
    }

    await prisma.user.update({
      where: { id: parseInt(id) },
      data: { active: false },
    });

    res.json({message: "Usuário excluído com sucesso"});
  } catch (err) {
    res.status({ error: "Erro interno ao excluir usuário" });
  }
  
};
