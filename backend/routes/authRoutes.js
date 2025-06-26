const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');
const adminOnly = require('../middlewares/isSuperAdmin');

router.post('/register', authMiddleware, adminOnly, authController.register); // só admin pode criar usuário

router.post('/login', authController.login);

// Rota para verificar login (usada pelo front)
router.get('/verify', authMiddleware, authController.verify);

router.delete('/:id', authMiddleware, adminOnly, authController.removeUser);

router.post('/logout', authController.logout);

module.exports = router;
