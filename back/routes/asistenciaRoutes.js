const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/asistenciaController');
const { validateValues } = require('../helpers/validar-campos');
const authMid=require('../middlewares/validarJWT')
const accessMid=require('../middlewares/validarRoles')
const asistenciaMid=require('../middlewares/asistenciaMid');

router.get('/obtener', controller.obtenerAsistencias);
router.get('/obtener/:id', controller.obtenerAsistenciaPorId);
router.get('/obtenerUsuario/:userId', controller.obtenerAsistenciasDeUsuario);
router.get('/obtenerUsuariosDeEvento/:eventoId', controller.obtenerUsuariosDeEvento);
router.post('/subirAsistencia',[
    check('idEvento').isInt(),
    check('idUsuario').isInt(),
    validateValues
],authMid.validarJWT,accessMid.esAdmin, asistenciaMid.asistenciaExiste(), controller.subirAsistencia);
router.delete('/borrarAsistencia/:id',authMid.validarJWT,accessMid.esAdmin, controller.borrarAsistencia);
router.get('/obtener/:eventoId/:usuarioId', controller.obtenerAsistenciaEventoUsuario)
module.exports = router;