const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize, connectDB } = require('./config/db'); 
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const contactRoutes = require('./routes/contactRoutes');

// A chamada dotenv.config() está no db.js, então não é necessária aqui
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Linha para servir arquivos estáticos (imagens) da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  
  // A alteração está aqui: { force: true } apaga e recria as tabelas.
  await sequelize.sync({ force: true }); 
  
  console.log('Tabelas sincronizadas com o banco de dados.');
});