// Laura
const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventoController');

router.get('/obtenerEventos', controller.obtenerEventos);
router.get('/eventos/:id', controller.obtenerEventoPorId);
router.post('/eventos', [
    check('nombre'),
    check('descripcion'),
    check('fecha'),
    check('hora'),
    check('foto'),
    check('mg'),
    check('visibilidad')
], controller.subirEvento);
router.delete('/eventos/:id', controller.borrarEvento);
router.put('/eventos/:id', controller.actualizarEvento);

module.exports = router;