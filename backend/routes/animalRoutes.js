const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const upload = require('../middlewares/upload');
const authenticate = require('../middlewares/auth');


// ROTAS PÚBLICAS
router.get('/:id', animalController.getAnimalById);

// ROTAS PROTEGIDAS
router.get('/', authenticate, animalController.getAllAnimais);
router.post('/', authenticate, animalController.createAnimal);
router.put('/:id', authenticate, animalController.updateAnimal);
router.delete('/:id', authenticate, animalController.deleteAnimal);

// Uploads (protegidos)
router.post('/:id/upload-imagem', authenticate, upload.single('imagem'), animalController.uploadImagem);
router.post('/:id/upload-som', authenticate, upload.single('som'), animalController.uploadSom);
router.post('/:id/upload-qrcode', authenticate, animalController.updateQrCode);

// Deletes (protegidos)
router.delete('/:id/delete-imagem', authenticate, animalController.deleteImagem);
router.delete('/:id/delete-som', authenticate, animalController.deleteSom);


module.exports = router;
