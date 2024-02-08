const express = require('express');
const router = express.Router();
const controller = require('../controllers/galeriaController');

router.get('/obtenerGalerias', controller.obtenerGalerias);
router.get('/obtenerGaleriaPorId/:id', controller.obtenerGaleriaPorId);
router.post('/subirGaleria', controller.subirGaleria);
router.delete('/borrarGaleria/:id', controller.borrarGaleria);

module.exports = router;