// filepath: c:\Users\joaotop50\Desktop\mvp-project\src\scripts\testHash.js
const bcrypt = require('bcryptjs');

const hash = '$2b$10$h2LecJjtdCc2.A1gfL/lxOpWu7JTVqUqwmpCjPEwXjhSNgAidWToe'; // Hash gerado no banco
const password = '123456';

bcrypt.compare(password, hash, (err, isMatch) => {
  if (err) {
    console.error('Erro ao comparar:', err);
  } else {
    console.log('As senhas correspondem?', isMatch);
  }
});