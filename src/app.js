// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./middlewares/logger');

// Inicializar a variável app
const app = express();

// Carregar variáveis de ambiente
dotenv.config();

// Middleware de logging
app.use(morgan('dev'));

// Middleware para parsear JSON
app.use(express.json());

// Middleware para tratar requisições com dados de formulários
app.use(express.urlencoded({ extended: true }));

// Serve arquivos estáticos da pasta 'public'
app.use('/public', express.static(path.join(__dirname, 'public')));

// Definir view engine como EJS
app.set('view engine', 'ejs');

// Definir a pasta de views
app.set('views', path.join(__dirname, 'views'));

// Rotas de autenticação
app.use('/', authRoutes);

// Middleware para tratar erros
app.use(errorHandler);

// Conectar ao MongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Definir porta do servidor
const port = process.env.PORT || 3000;

// Rota inicial
app.get('/', (req, res) => {
  res.render('login'); // Isso busca o arquivo views/login.ejs
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// src/app.js
const authMiddleware = require('/Users/joaotop50/Desktop/mvp-project/src/middlewares/authMiddleware.js');

// Rota para dashboard
app.get('/dashboard', authMiddleware, (req, res) => {
  res.render('dashboard'); // Crie um arquivo views/dashboard.ejs
});
