// routes/subRelogioRoutes.js
const express = require('express');
const router = express.Router();
const subRelogioController = require('../controllers/subRelogioController');

router.post('/subrelogios', subRelogioController.createSubRelogio);
router.get('/subrelogios', subRelogioController.getAllSubRelogios);
router.get('/subrelogios/:id', subRelogioController.getSubRelogioById);
router.put('/subrelogios/:id', subRelogioController.updateSubRelogio);
router.delete('/subrelogios/:id', subRelogioController.deleteSubRelogio);

module.exports = router;
