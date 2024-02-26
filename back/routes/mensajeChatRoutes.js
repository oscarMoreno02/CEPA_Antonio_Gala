/*Laura María Pedraza Gómez* */
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const controller = require ('../controllers/mensajeChatController');
const { validateValues } = require('../helpers/validar-campos');

router.get('/obtener', controller.obtenerMensajes);
router.get('/obtenerId/:id', controller.obtenerMensajeChatPorId);
router.post('/subirMensajeChat', [
    check('idChat').isInt(),
    check('idUsuario').isInt(),
    check('mensaje').isString().notEmpty().isLength({ min: 1, max: 250 }),
    validateValues
], controller.subirMensajeChat);
router.delete('/borrar/:id', controller.borrarMensajeChat);

module.exports = router;