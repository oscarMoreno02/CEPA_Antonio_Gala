// Laura
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/eventoController');
const { validateValues } = require('../helpers/validar-campos');

router.get('/obtener', controller.obtenerEventos);
router.get('/obtener/:id', controller.obtenerEventoPorId);
router.post('', [
    check('nombre').isString().notEmpty().isLength({ min: 2, max: 50 }),
    check('descripcion').isString().notEmpty(),
    check('fecha').isString().notEmpty(),
    check('hora').isString().notEmpty(),
    check('fotoCartel').isString().notEmpty(),
    check('mg').isInt(),
    check('visibilidad').isBoolean(),
    validateValues
], controller.subirEvento);
router.delete('/:id', controller.borrarEvento);
router.put('/:id', [
    check('nombre').isString().notEmpty().isLength({ min: 2, max: 50 }),
    check('descripcion').isString().notEmpty(),
    check('fecha').isString().notEmpty(),
    check('hora').isString().notEmpty(),
    check('fotoCartel').isString().notEmpty(),
    check('mg').isInt(),
    check('visibilidad').isBoolean(),
    validateValues
], controller.actualizarEvento);

module.exports = router;