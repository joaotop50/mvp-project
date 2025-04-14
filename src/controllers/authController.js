// src/controllers/authController.js
const authService = require('../services/authService');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authService.loginUser(email, password);
    if (result.error) {
      res.render('login', { error: result.error });
    } else {
      res.cookie('token', result.token, { httpOnly: true }).redirect('/dashboard');
    }
  } catch (err) {
    res.status(500).render('login', { error: 'Erro ao fazer login' });
  }
};
