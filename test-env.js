const dotenv = require('dotenv');

console.log('--- Iniciando teste do .env ---');

// Tenta carregar o arquivo .env e captura o resultado
const result = dotenv.config();

// Se o dotenv encontrar um erro ao LER o arquivo, ele mostrará aqui
if (result.error) {
  console.error('ERRO DETECTADO PELO DOTENV:', result.error);
}

console.log('--- Variáveis de Ambiente Carregadas ---');
console.log('PORTA:', process.env.PORT);
console.log('DB_DIALECT:', process.env.DB_DIALECT);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('------------------------------------');

// Mostra o que o dotenv conseguiu "ler" do arquivo
console.log('Objeto "parsed" do dotenv:', result.parsed);