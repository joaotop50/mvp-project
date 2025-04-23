const path = require('path');
const { validationResult } = require('express-validator');
const authService = require('../services/authService');

exports.login = async (req, res) => {
  console.log('Dados recebidos no login:', req.body); // Log dos dados enviados pelo formulário

  // Valida os erros dos campos
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Erros de validação:', errors.array());
    return res.status(400).render('login', { error: 'Dados inválidos' });
  }

  const { email, password } = req.body;

  try {
    // Chama o serviço de autenticação
    const result = await authService.loginUser(email, password);
    console.log('Resultado do serviço de autenticação:', result); // Log do resultado do serviço

    if (result.error) {
      return res.status(401).render('login', { error: result.error });
    }

    // Define o token em um cookie seguro e redireciona para o dashboard
    res.cookie('token', result.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Erro ao tentar logar:', err);
    res.status(500).sendFile(path.join(__dirname, '../views/error.html'));
  }
};

exports.logout = (req, res) => {
  // Limpa o cookie de autenticação e redireciona para a página inicial
  res.clearCookie('token');
  res.redirect('/');
};