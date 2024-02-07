const express = require('express');
const router = express.Router();
const controller = require ('../controllers/mensajeChatController')

router.get('/obtenerMensajes', controller.obtenerMensajes);
router.get('/obtenerMensajeCharId/:id', controller.obtenerMensajeChatPorId);
router.post('/subirMensajeChat', controller.subirMensajeChat);
router.delete('/borrarMensajeChat/:id', controller.borrarMensajeChat);

module.exports = router;