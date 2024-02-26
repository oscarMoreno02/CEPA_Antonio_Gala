/*Laura María Pedraza Gómez* */
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/chatController');
const { validateValues } = require('../helpers/validar-campos');

router.get('/obtener', controller.obtenerChats);
router.get('/obtener/:id', controller.obtenerChatsPorId);
router.post('/subirChat',[
    check('idEvento').isInt(),
    check('activo').isBoolean(),
    validateValues
], controller.subirChat);
router.delete('/borrar/:id', controller.borrarChat);

module.exports = router;