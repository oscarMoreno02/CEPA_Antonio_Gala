const express = require('express');
const router = express.Router();
const controller = require('../controllers/charController');

router.get('/obtenerChats', controller.obtenerChats);
router.get('/obtenerChatsId/:id', controller.obtenerChatsPorId);
router.post('/subirChat', controller.subirChat);
router.delete('/borrarChat/:id', controller.borrarChat);

module.exports = router;