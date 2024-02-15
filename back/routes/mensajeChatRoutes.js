const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controller = require ('../controllers/mensajeChatController')

router.get('/obtenerMensajes', controller.obtenerMensajes);
router.get('/obtenerMensajeCharId/:id', controller.obtenerMensajeChatPorId);
router.post('/subirMensajeChat', [
    check('idChat').isInt(),
    check('idUsuario').isInt(),
    check('mensaje').isString().notEmpty().length({ min: 1, max: 250 })
], controller.subirMensajeChat);
router.delete('/borrarMensajeChat/:id', controller.borrarMensajeChat);

module.exports = router;