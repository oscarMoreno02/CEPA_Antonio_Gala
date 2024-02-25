const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/chatController');
const { validateValues } = require('../helpers/validar-campos');

router.get('/obtenerChats', controller.obtenerChats);
router.get('/obtenerChatsId/:id', controller.obtenerChatsPorId);
router.post('/subirChat',[
    check('idEvento').isInt(),
    check('activo').isBoolean(),
    validateValues
], controller.subirChat);
router.delete('/borrarChat/:id', controller.borrarChat);

module.exports = router;