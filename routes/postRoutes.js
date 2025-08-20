const express = require('express');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Importa o middleware de upload
const router = express.Router();

// Rotas públicas (qualquer um pode ver os posts)
router.get('/', getPosts);
router.get('/:id', getPostById);

// Rotas protegidas 
// A rota de criação agora usa o middleware 'upload' para processar um arquivo do campo 'image'
router.post('/', protect, upload.single('image'), createPost);

router.put('/:id', protect, updatePost); // A rota de update pode ser estendida para receber imagens também no futuro
router.delete('/:id', protect, deletePost);

module.exports = router;