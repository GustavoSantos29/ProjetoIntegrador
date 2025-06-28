const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const animalRoutes = require('./routes/animalRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(cookieParser());

app.use('/api/users', authRoutes);  // aqui o json parser está dentro do authRoutes
app.use('/api/animais', animalRoutes); // aqui não tem json parser

app.use('/imagens', express.static('public/imagens'));
app.use('/sons', express.static('public/sons'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
