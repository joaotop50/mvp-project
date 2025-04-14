// src/config/database.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado ao banco de dados');
  } catch (err) {
    console.error('Erro de conexão', err);
    process.exit(1);
  }
};

module.exports = connectDB;
