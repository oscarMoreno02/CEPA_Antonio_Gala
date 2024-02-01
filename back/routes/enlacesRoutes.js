require('express-group-routes')
const {Router} = require('express');
const router = Router();
const { check } = require('express-validator');
const {validateValues}=require('../helpers/validar-campos')

// const midCategoria=require('../middlewares/categoriasMid')
const controller=require('../controllers/enlacesController')

    router.get('/seccion/:id',controller.listEnlacesBySeccion)
    router.get('/:id',controller.listEnlace)
    router.get('',controller.listAllEnlaces)
    router.put('/:id',controller.editEnlace)
    router.delete('/:id',controller.removeEnlace)

    router.post('',controller.createEnlace)

    module.exports = router;