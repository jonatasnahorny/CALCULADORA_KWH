const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um novo relógio principal
async function createRelogioPrincipal(req, res) {
    try {
        const { nome, referencia, kwh_fatura, valor_fatura, observacao } = req.body;
        const novoRelogio = await prisma.relogio_principal.create({
            data: { nome, referencia, kwh_fatura, valor_fatura, observacao }
        });
        res.status(201).json(novoRelogio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Listar todos os relógios principais
async function getRelogiosPrincipais(req, res) {
    try {
        const relogios = await prisma.relogio_principal.findMany({
            include: { sub_relogios: true }
        });
        res.json(relogios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obter um relógio principal pelo ID
async function getRelogioPrincipalById(req, res) {
    try {
        const { id } = req.params;
        const relogio = await prisma.relogio_principal.findUnique({
            where: { id: Number(id) },
            include: { sub_relogios: true }
        });
        if (!relogio) return res.status(404).json({ error: "Relógio principal não encontrado" });
        res.json(relogio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Atualizar um relógio principal
async function updateRelogioPrincipal(req, res) {
    try {
        const { id } = req.params;
        const { nome, referencia, kwh_fatura, valor_fatura, observacao } = req.body;
        const relogioAtualizado = await prisma.relogio_principal.update({
            where: { id: Number(id) },
            data: { nome, referencia, kwh_fatura, valor_fatura, observacao }
        });
        res.json(relogioAtualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Deletar um relógio principal
async function deleteRelogioPrincipal(req, res) {
    try {
        const { id } = req.params;
        await prisma.relogio_principal.delete({ where: { id: Number(id) } });
        res.json({ message: "Relógio principal deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createRelogioPrincipal,
    getRelogiosPrincipais,
    getRelogioPrincipalById,
    updateRelogioPrincipal,
    deleteRelogioPrincipal
};
