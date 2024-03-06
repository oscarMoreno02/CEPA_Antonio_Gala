/*Laura María Pedraza Gómez* */
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/galeriaController');
const { validateValues } = require('../helpers/validar-campos');
const authMid=require('../middlewares/validarJWT')

router.get('/', controller.obtenerGalerias);
router.get('/:id', controller.obtenerGaleriaPorId);
router.post('/',[
    check('idEvento').isInt(),
    check('foto').isString().notEmpty(),
    validateValues
],authMid.validarJWT, controller.subirGaleria);
router.delete('/:id', authMid.validarJWT, controller.borrarGaleria);
router.get('/galeriaEvento/:id', controller.obtenerGaleriaEvento)

module.exports = router;