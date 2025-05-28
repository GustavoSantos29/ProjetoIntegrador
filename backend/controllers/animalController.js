const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');

// Criar novo animal
exports.createAnimal = async (req, res) => {
  try {
    const animal = await prisma.animal.create({
      data: req.body,
    });
    res.status(201).json(animal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos os animais
exports.getAllAnimais = async (req, res) => {
  try {
    const animais = await prisma.animal.findMany();
    res.json(animais);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar um animal por ID
exports.getAnimalById = async (req, res) => {
  try {
    const animal = await prisma.animal.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar um animal
exports.updateAnimal = async (req, res) => {
  try {
    const animal = await prisma.animal.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(animal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Deletar um animal
exports.deleteAnimal = async (req, res) => {
  try {
    await prisma.animal.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Animal deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// salva o caminho da imagem
  exports.uploadImagem = async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    const id = parseInt(req.params.id);
    const fileName = req.file.filename;

    try {
      // Atualiza o campo 'foto' no animal
      const updatedAnimal = await prisma.animal.update({
        where: { id },
        data: { foto: fileName },
      });
  
      const caminho = `/imagens/${fileName}`;
      res.json({ caminho, animal: updatedAnimal });
    } catch (error) {
      console.error('Erro ao atualizar imagem no banco:', error);
      res.status(500).json({ error: 'Erro ao atualizar o animal com a imagem' });
    }
  };

  // salva o caminho do som
  exports.uploadSom = async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    const id = parseInt(req.params.id);
    const fileName = req.file.filename;

    try {
      // Atualiza o campo 'som' no animal
      const updatedAnimal = await prisma.animal.update({
        where: { id },
        data: { audio: fileName },
      });
  
      const caminho = `/sons/${fileName}`;
      res.json({ caminho, animal: updatedAnimal });
    } catch (error) {
      console.error('Erro ao atualizar som no banco:', error);
      res.status(500).json({ error: 'Erro ao atualizar o animal com o som' });
    }
  };
