/*Laura María Pedraza Gómez* */
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/asistenciaController');
const { validateValues } = require('../helpers/validar-campos');
const authMid=require('../middlewares/validarJWT')
const accessMid=require('../middlewares/validarRoles')
const asistenciaMid=require('../middlewares/asistenciasMid');

router.get('/', controller.obtenerAsistencias);
router.get('/:id', controller.obtenerAsistenciaPorId);
router.get('/asistenciasUsuario/:userId',authMid.validarJWT, controller.obtenerAsistenciasDeUsuario);
router.get('/asistenciasEvento/:eventoId', controller.obtenerUsuariosDeEvento);
router.post('/',[
    check('idEvento').isInt(),
    check('idUsuario').isInt(),
    validateValues
],authMid.validarJWT, asistenciaMid.asistenciaExiste(), controller.subirAsistencia);
router.delete('/:id',authMid.validarJWT, controller.borrarAsistencia);
router.get('/asistenciaEventoUsuario/:eventoId/:usuarioId', controller.obtenerAsistenciaEventoUsuario)
module.exports = router;