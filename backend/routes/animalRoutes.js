const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const upload = require('../middlewares/upload');

router.post('/', animalController.createAnimal);
router.get('/', animalController.getAllAnimais);
router.get('/:id', animalController.getAnimalById);
router.put('/:id', animalController.updateAnimal);
router.delete('/:id', animalController.deleteAnimal);

//Uploads
router.post('/:id/upload-imagem', upload.single('imagem'), animalController.uploadImagem);
router.post('/:id/upload-som', upload.single('som'), animalController.uploadSom);

//Deletes
router.delete('/:id/delete-imagem', animalController.deleteImagem);
router.delete('/:id/delete-som', animalController.deleteSom);


module.exports = router;
