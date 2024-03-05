//Raúl

const {Router } = require('express');
const controlador = require('../controllers/rolesAsignadosController');
const router = Router();

router.get('/', controlador.rolesAsignadosGet)
router.get('/:idUser', controlador.rolesAsignadosGetIdUsu)
router.post('/', controlador.rolesAsignadosPost)
router.put('/:id', controlador.rolesAsignadosPut)
router.delete('/:id', controlador.rolesAsignadosDelete)

module.exports = router;