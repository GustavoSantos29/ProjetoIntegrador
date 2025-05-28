const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const animalRoutes = require('./routes/animalRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/animais', animalRoutes);
app.use('/imagens', express.static('public/imagens'));
app.use('/sons', express.static('public/sons'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
