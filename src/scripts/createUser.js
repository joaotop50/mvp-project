const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco de dados
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Conectado ao banco de dados MongoDB');
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  }
};

// Função para criar um novo usuário
const createUser = async (email, password, name) => {
  try {
    // Gerar o hash da senha diretamente com o fator de custo
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o usuário
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    // Salvar no banco de dados
    await newUser.save();
    console.log('Usuário criado com sucesso:', newUser);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
  }
};

// Executar o script
const run = async () => {
  await connectDB();
  await createUser('teste@email.com', '123456', 'Teste');
  mongoose.connection.close();
};

run();