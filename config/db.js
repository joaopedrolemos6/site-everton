const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path'); // Importa o módulo 'path' do Node.js

// Instruímos o dotenv a carregar o arquivo .env que está na pasta raiz do backend
// path.resolve(__dirname, '../.env') cria o caminho completo para o arquivo.
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Agora, quando o código abaixo for executado, as variáveis de ambiente já estarão carregadas.
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Conectado...');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };