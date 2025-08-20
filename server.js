// ===== BLOCO DE DIAGNÓSTICO =====
// Este código vai rodar antes de tudo e nos mostrar as variáveis.
const dotenv = require('dotenv');
dotenv.config();
console.log('--- VERIFICANDO VARIÁVEIS DE AMBIENTE NO DEPLOY ---');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_DIALECT:', process.env.DB_DIALECT);
// Não vamos logar a senha por segurança
console.log('---------------------------------------------');
// ===================================

const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize, connectDB } = require('./config/db'); 
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const contactRoutes = require('./routes/contactRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  await sequelize.sync(); 
  console.log('Tabelas sincronizadas com o banco de dados.');
});