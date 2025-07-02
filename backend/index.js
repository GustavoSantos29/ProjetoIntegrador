const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const animalRoutes = require('./routes/animalRoutes');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

app.use('/api/users', authRoutes);  
app.use('/api/animais', animalRoutes);
app.use('/api/artigos', articleRoutes);


app.use('/imagens', express.static('public/imagens'));
app.use('/sons', express.static('public/sons'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
