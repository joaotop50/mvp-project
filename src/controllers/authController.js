const path = require('path');
const authService = require('../services/authService');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authService.loginUser(email, password);
    if (result.error) {
      // Redireciona de volta para o login com uma mensagem de erro na URL (exemplo simples)
      return res.redirect('/?error=' + encodeURIComponent(result.error));
    }

    // Define o token em cookie e redireciona para a dashboard
    res.cookie('token', result.token, { httpOnly: true });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).sendFile(path.join(__dirname, '../views/error.html'));
  }
};
