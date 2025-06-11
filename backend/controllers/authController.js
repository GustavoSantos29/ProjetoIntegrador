const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SECRET = 'Gira Aspas';

exports.register = async (req, res) => {
  const { email, senha } = req.body;
  const hashedPassword = bcrypt.hashSync(senha, 10);

  try {
    const user = await prisma.user.create({
      data: { email, senha: hashedPassword },
    });

    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao registrar usuário' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !bcrypt.compareSync(senha, user.senha)) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });

  res.json({ token });
};
