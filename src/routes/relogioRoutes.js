// routes/relogioRoutes.js
const express = require('express');
const router = express.Router();
const relogioController = require('../controllers/relogioController');

router.post('/relogios', relogioController.createRelogioPrincipal);
router.get('/relogios', relogioController.getRelogiosPrincipais);
router.get('/relogios/:id', relogioController.getRelogioPrincipalById);
router.put('/relogios/:id', relogioController.updateRelogioPrincipal);
router.delete('/relogios/:id', relogioController.deleteRelogioPrincipal);

module.exports = router;
