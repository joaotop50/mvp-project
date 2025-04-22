// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Exibe o formulário de login
router.get('/', (req, res) => {
  res.render('login', { error: null });
});

// Processa o login quando o formulário é enviado
router.post('/login', authController.login);

module.exports = router;

const { body } = require('express-validator');

router.post('/login', 
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
  authController.login
);
router.get('/logout', authController.logout);
