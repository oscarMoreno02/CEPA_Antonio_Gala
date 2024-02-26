/*Laura María Pedraza Gómez* */
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/asistenciaController');
const { validateValues } = require('../helpers/validar-campos');
const authMid=require('../middlewares/validarJWT')
const accessMid=require('../middlewares/validarRoles')
const asistenciaMid=require('../middlewares/asistenciaMid');

router.get('/', controller.obtenerAsistencias);
router.get('/:id', controller.obtenerAsistenciaPorId);
router.get('/asistenciasUsuario/:userId', controller.obtenerAsistenciasDeUsuario);
router.get('/asistenciasEvento/:eventoId', controller.obtenerUsuariosDeEvento);
router.post('/subirAsistencia',[
    check('idEvento').isInt(),
    check('idUsuario').isInt(),
    validateValues
],authMid.validarJWT,accessMid.esAdmin, asistenciaMid.asistenciaExiste(), controller.subirAsistencia);
router.delete('/:id',authMid.validarJWT,accessMid.esAdmin, controller.borrarAsistencia);
router.get('/asistenciaEventoUsuario/:eventoId/:usuarioId', controller.obtenerAsistenciaEventoUsuario)
module.exports = router;