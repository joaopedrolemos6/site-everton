const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Pega o token do header (formato: "Bearer TOKEN")
      token = req.headers.authorization.split(' ')[1];
      
      // Verifica se o token é válido
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Anexa o ID do usuário à requisição para uso posterior
      req.userId = decoded.id;
      
      next();
    } catch (error) {
      res.status(401).json({ message: 'Não autorizado, token falhou' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Não autorizado, sem token' });
  }
};

// A linha mais importante que provavelmente está faltando ou incorreta.
module.exports = { protect };