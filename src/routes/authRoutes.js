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
