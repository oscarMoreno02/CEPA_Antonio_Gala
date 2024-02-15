const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/asistenciaController');

router.get('/obtenerAsistencias', controller.obtenerAsistencias);
router.get('/obtenerAsistenciasId/:id', controller.obtenerAsistenciaPorId);
router.get('/obtenerAsistenciasUsuario/:userId', controller.obtenerAsistenciasDeUsuario);
router.get('/obtenerUsuariosDeEvento/:eventoId', controller.obtenerUsuariosDeEvento);
router.post('/subirAsistencia',[
    check('idEvento').isInt(),
    check('idUsuario').isInt()
], controller.subirAsistencia);
router.delete('/borrarAsistencia/:id', controller.borrarAsistencia);

module.exports = router;