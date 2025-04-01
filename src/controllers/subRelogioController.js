const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um novo sub-relógio
async function createSubRelogio(req, res) {
    try {
        const { id_relogio_principal, nome, referencia, kwh_acumulado, ativo, observacao } = req.body;

        // Verifica se o relógio principal existe
        const relogioPrincipal = await prisma.relogio_principal.findUnique({
            where: { id: id_relogio_principal }
        });

        if (!relogioPrincipal) {
            return res.status(400).json({ error: "Relógio principal não encontrado" });
        }

        const novoSubRelogio = await prisma.sub_relogio.create({
            data: { id_relogio_principal, nome, referencia, kwh_acumulado, ativo, observacao }
        });
        res.status(201).json(novoSubRelogio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Listar todos os sub-relógios
async function getSubRelogios(req, res) {
    try {
        const subRelogios = await prisma.sub_relogio.findMany({
            include: { relogio_principal: true }
        });
        res.json(subRelogios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obter um sub-relógio pelo ID
async function getSubRelogioById(req, res) {
    try {
        const { id } = req.params;
        const subRelogio = await prisma.sub_relogio.findUnique({
            where: { id: Number(id) },
            include: { relogio_principal: true }
        });
        if (!subRelogio) return res.status(404).json({ error: "Sub-relógio não encontrado" });
        res.json(subRelogio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Atualizar um sub-relógio
async function updateSubRelogio(req, res) {
    try {
        const { id } = req.params;
        const { id_relogio_principal, nome, referencia, kwh_acumulado, ativo, observacao } = req.body;
        const subRelogioAtualizado = await prisma.sub_relogio.update({
            where: { id: Number(id) },
            data: { id_relogio_principal, nome, referencia, kwh_acumulado, ativo, observacao }
        });
        res.json(subRelogioAtualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Deletar um sub-relógio
async function deleteSubRelogio(req, res) {
    try {
        const { id } = req.params;
        await prisma.sub_relogio.delete({ where: { id: Number(id) } });
        res.json({ message: "Sub-relógio deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createSubRelogio,
    getSubRelogios,
    getSubRelogioById,
    updateSubRelogio,
    deleteSubRelogio
};
