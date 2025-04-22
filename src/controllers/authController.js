// src/controllers/authController.js
const path = require('path');
const authService = require('../services/authService');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authService.loginUser(email, password);

    if (result.error) {
      // Reexibe a página de login com erro (ideal se você usar EJS, não redirecionar)
      return res.status(401).render('login', { error: result.error });
    }

    // Define o token em cookie e redireciona para a dashboard
    res.cookie('token', result.token, { httpOnly: true });
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Erro ao tentar logar:', err);
    res.status(500).sendFile(path.join(__dirname, '../views/error.html'));
  }
};


const { validationResult } = require('express-validator');

// No método login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('login', { error: 'Dados inválidos' });
  }

  const { email, password } = req.body;

  try {
    const result = await authService.loginUser(email, password);

    if (result.error) {
      return res.status(401).render('login', { error: result.error });
    }

    res.cookie('token', result.token, { httpOnly: true });
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Erro ao tentar logar:', err);
    res.status(500).sendFile(path.join(__dirname, '../views/error.html'));
  }
};
// src/controllers/authController.js
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};
