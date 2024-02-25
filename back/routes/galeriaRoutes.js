const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/galeriaController');
const { validateValues } = require('../helpers/validar-campos');

router.get('/obtenerGalerias', controller.obtenerGalerias);
router.get('/obtenerGaleriaPorId/:id', controller.obtenerGaleriaPorId);
router.post('/subirGaleria',[
    check('idEvento').isInt(),
    check('foto').isString().notEmpty(),
    validateValues
], controller.subirGaleria);
router.delete('/borrarGaleria/:id', controller.borrarGaleria);

module.exports = router;