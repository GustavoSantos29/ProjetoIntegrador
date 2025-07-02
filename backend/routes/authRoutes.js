const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');
const adminOnly = require('../middlewares/isSuperAdmin');

router.post('/register', authMiddleware, adminOnly, authController.register); // só admin pode criar usuário

router.post('/login', authController.login);

router.get('/', authMiddleware, adminOnly, authController.getAllUsers);

router.get('/verify', authMiddleware, authController.verify);

router.put('/:id', authMiddleware, adminOnly, authController.updateUser);

router.get('/:id', authMiddleware, adminOnly, authController.getUserById);


router.delete('/:id', authMiddleware, adminOnly, authController.removeUser);

router.post('/logout', authController.logout);

module.exports = router;
