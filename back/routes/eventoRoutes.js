const express = require('express');
const router = express.Router();

router.get('/eventos', obtenerEventos);
router.get('/eventos/:id', obtenerEventoPorId);
router.post('/eventos', subirEvento);
router.delete('/eventos/:id', borrarEvento);
router.put('/eventos/:id', actualizarEvento);

module.exports = router;