const express = require('express');
const router = express.Router();
const controller = require('../controllers/asistenciaController');

router.get('/obtenerAsistencias', controller.obtenerAsistencias);
router.get('/obtenerAsistenciasId/:id', controller.obtenerAsistenciasPorId);
router.get('/obtenerAsistenciasUsuario/:userId', controller.obtenerAsistenciasDeUsuario);
router.get('/obtenerUsuariosDeEvento/:eventoId', controller.obtenerUsuariosDeEvento);
router.post('/subirAsistencia', controller.subirAsistencia);
router.delete('/borrarAsistencia/:id', controller.borrarAsistencia);

module.exports = router;