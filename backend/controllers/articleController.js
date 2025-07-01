const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getArticlesByAnimal = async (req, res) => {
    const idAnimal = parseInt(req.params.idAnimal);

    try {
        const articles = await prisma.article.findMany({
            where: { idAnimal },
            orderBy: { id: 'asc' },
        });
        res.json(articles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.createArticle = async (req, res) => {
    const { idAnimal, nome, link } = req.body;

    if (!idAnimal || !nome || !link) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const article = await prisma.article.create({
            data: {
                idAnimal: parseInt(idAnimal),
                nome,
                link,
            },
        });
        res.status(201).json(article);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteArticle = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await prisma.article.delete({
            where: { id },
        });
        res.status(204).send(); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
