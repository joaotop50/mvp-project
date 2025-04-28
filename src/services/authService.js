const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.loginUser = async (email, password) => {
  try {
    // Busca o usuário pelo e-mail
    const user = await User.findOne({ email });
    if (!user) {
      return { error: 'Usuário não encontrado' };
    }

    // Comparar a senha diretamente (sem bcrypt)
    const isMatch = password === user.password;
    if (!isMatch) {
      return { error: 'Senha incorreta' };
    }

    // Gera um token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Retorna o token e os dados do usuário
    return { token, user };
  } catch (err) {
    console.error('Erro no serviço de autenticação:', err);
    return { error: 'Erro ao autenticar' };
  }
};
