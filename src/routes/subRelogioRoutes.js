const express = require('express');
const router = express.Router();
const subRelogioController = require('../controllers/subRelogioController');

router.post('/sub-relogios', subRelogioController.createSubRelogio);
router.get('/sub-relogios', subRelogioController.getAllSubRelogios);
router.get('/sub-relogios/:id', subRelogioController.getSubRelogioById);
router.put('/sub-relogios/:id', subRelogioController.updateSubRelogio);
router.delete('/sub-relogios/:id', subRelogioController.deleteSubRelogio);

module.exports = router;
