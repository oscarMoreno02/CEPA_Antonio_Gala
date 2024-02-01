require('express-group-routes')
const {Router} = require('express');
const router = Router();
const { check } = require('express-validator');

const controller=require('../controllers/categoriasController')
    router.get('/agrupadas',controller.listAllCategoriasAgrupadas)
    router.get('/agrupadas/:id',controller.listCategoriaAgrupada)
    router.get('/:id',controller.listCategoria)
    router.put('/:id',controller.editCategoria)
    router.delete('/:id',controller.removeCategoria)
    router.get('',controller.listAllCategorias)
    router.post('',controller.createCategoria)
    module.exports = router;