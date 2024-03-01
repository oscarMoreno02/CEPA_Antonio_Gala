//Raúl

const {Router } = require('express');
const controlador = require('../controllers/usuarioController');
const router = Router();

router.get('/', controlador.usuariosGet)
router.get('/:id', controlador.usuarioGet)
router.post('/', controlador.usuariosPost)
router.put('/:id', controlador.usuariosPut)
router.delete('/:id', controlador.usuariosDelete)

module.exports = router;