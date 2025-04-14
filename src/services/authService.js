// src/services/authService.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return { error: 'Usuário não encontrado' };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { error: 'Senha incorreta' };

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
  } catch (err) {
    console.error(err);
    return { error: 'Erro ao autenticar' };
  }
};
