const express = require('express');
const router = express.Router();
const relogioController = require('../controllers/relogioController');

router.post('/relogios', relogioController.createRelogio);
router.get('/relogios', relogioController.getAllRelogios);
router.get('/relogios/:id', relogioController.getRelogioById);
router.put('/relogios/:id', relogioController.updateRelogio);
router.delete('/relogios/:id', relogioController.deleteRelogio);

module.exports = router;
