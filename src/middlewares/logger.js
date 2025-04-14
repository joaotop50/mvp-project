// src/middlewares/logger.js
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath);
}

const logFile = path.join(logPath, 'access.log');

const logger = (req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}\n`;
  fs.appendFile(logFile, log, err => {
    if (err) console.error('Erro ao salvar log:', err);
  });
  next();
};

module.exports = logger;
