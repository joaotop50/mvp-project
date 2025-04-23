const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Configuração para evitar alertas de strictQuery
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    // Conexão ao MongoDB sem opções depreciadas
    await mongoose.connect(process.env.DB_URL);
    console.log('Conectado ao banco de dados MongoDB');
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw err;
  }
};

module.exports = connectDB;