const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');

// Criar um post (com upload de imagem)
const createPost = async (req, res) => {
  try {
    const { title, summary, content } = req.body;
    
    // O multer nos dá o caminho do arquivo em req.file.path
    // Criamos uma URL relativa para salvar no banco, ex: /uploads/image-12345.png
    const imageUrl = req.file ? `/${req.file.path.replace(/\\/g, "/")}` : null;

    const post = await Post.create({ title, summary, content, imageUrl });
    res.status(201).json(post);
  } catch (error) {
    console.error('ERRO DETALHADO AO CRIAR POST:', error);
    res.status(500).json({ message: 'Erro ao criar post', error: error.message });
  }
};

// Pegar todos os posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
    res.json(posts);
  } catch (error) {
    console.error('ERRO DETALHADO AO BUSCAR POSTS:', error);
    res.status(500).json({ message: 'Erro ao buscar posts' });
  }
};

// Pegar um post por ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post não encontrado' });
    }
  } catch (error) {
    console.error('ERRO DETALHADO AO BUSCAR POST POR ID:', error);
    res.status(500).json({ message: 'Erro ao buscar post' });
  }
};

// Atualizar um post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      // Nota: Esta função ainda não lida com a atualização/troca de imagem.
      const updatedPost = await post.update(req.body);
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post não encontrado' });
    }
  } catch (error) {
    console.error('ERRO DETALHADO AO ATUALIZAR POST:', error);
    res.status(500).json({ message: 'Erro ao atualizar post' });
  }
};

// Deletar um post (e sua imagem associada)
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      // Se o post tiver uma imagem, delete o arquivo do servidor
      if (post.imageUrl) {
        // Cria o caminho absoluto para o arquivo de imagem
        const imagePath = path.join(__dirname, '..', post.imageUrl);
        
        // fs.unlink remove o arquivo do sistema
        fs.unlink(imagePath, (err) => {
          if (err) {
            // Apenas logamos o erro, mas não paramos o processo se o arquivo não for encontrado
            console.error("Erro ao deletar arquivo de imagem (pode já ter sido removido):", err);
          } else {
            console.log(`Arquivo de imagem ${imagePath} deletado com sucesso.`);
          }
        });
      }

      await post.destroy();
      res.json({ message: 'Post removido' });
    } else {
      res.status(404).json({ message: 'Post não encontrado' });
    }
  } catch (error) {
    console.error('ERRO DETALHADO AO DELETAR POST:', error);
    res.status(500).json({ message: 'Erro ao deletar post' });
  }
};

module.exports = { 
  createPost, 
  getPosts, 
  getPostById, 
  updatePost, 
  deletePost 
};