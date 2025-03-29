// Importa as dependências
require('dotenv').config(); // Carrega variáveis do arquivo .env
const express = require('express'); // Express para criar o servidor
const { PrismaClient } = require('@prisma/client'); // Prisma Client para interagir com o banco de dados

// Cria uma instância do servidor Express
const app = express();

// Cria uma instância do Prisma Client
const prisma = new PrismaClient();

// Rota para testar a conexão com o banco
app.get('/', async (req, res) => {
  try {
    // Exemplo de consulta no banco de dados com Prisma
    const relogios = await prisma.relogio.findMany();
    res.json(relogios); // Retorna os dados de todos os relógios como JSON
  } catch (error) {
    res.status(500).send('Erro ao conectar ao banco de dados');
  }
});

// Configura o servidor para escutar na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
