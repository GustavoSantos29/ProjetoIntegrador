const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authenticate = require('../middlewares/auth');



router.get('/:idAnimal',articleController.getArticlesByAnimal);

router.put('/:id', authenticate, articleController.updateArticle);

router.post('/', authenticate,articleController.createArticle);

router.delete('/:id', authenticate,articleController.deleteArticle);

module.exports = router;
