const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Cria o diretório de uploads se não existir
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Salva os arquivos na pasta 'uploads/'
  },
  filename: (req, file, cb) => {
    // Cria um nome de arquivo único para evitar conflitos
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;