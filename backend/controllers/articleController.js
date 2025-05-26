const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar novo artigo
exports.createArticle = async (req, res) => {
    try {
      const article = await prisma.article.create({
        data: req.body,
      });
      res.status(201).json(article);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
};
  
// Listar todos os artigos
exports.getAllArticles = async (req, res) => {
    try {
      const articles = await prisma.article.findMany();
      res.json(articles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Buscar um artigo por ID
  exports.getArticleById = async (req, res) => {
    try {
      const article = await prisma.article.findUnique({
        where: { id: parseInt(req.params.id) },
      });
      if (!article) return res.status(404).json({ error: 'artigo não encontrado' });
      res.json(article);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Atualizar um artigos
  exports.updatearticle = async (req, res) => {
    try {
      const article = await prisma.article.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
      });
      res.json(article);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };