const { PrismaClient } = require('@prisma/client');

// Cria uma instância do Prisma Client
const prisma = new PrismaClient();

module.exports = prisma;
