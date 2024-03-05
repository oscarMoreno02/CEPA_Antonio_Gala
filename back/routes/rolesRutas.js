//Raúl

const {Router } = require('express');
const controlador = require('../controllers/rolesController');
const router = Router();

router.get('/', controlador.rolesGet)
router.post('/', controlador.rolesPost)
router.put('/:id', controlador.rolesPut)
router.delete('/id', controlador.rolesDelete)

module.exports = router;