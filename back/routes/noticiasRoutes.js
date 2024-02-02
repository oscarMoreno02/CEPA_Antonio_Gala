require('express-group-routes')
const {Router} = require('express');
const router = Router();
const { check } = require('express-validator');
const {validateValues}=require('../helpers/validar-campos')


const controller=require('../controllers/noticiasController')

    router.get('/categoria/:id',controller.listNoticiasByCategorias)
    router.get('/enlaces/:id',controller.listNoticiasWithSecciones)
    router.get('/enlaces',controller.listAllNoticiasWithSecciones)
    router.get('/:id',controller.listNoticia)
    router.get('/',controller.listAllNoticias)
    router.put('/:id',controller.editNoticia)
    router.delete('/:id',controller.removeNoticia)

    router.post('',controller.createNoticia)

    module.exports = router;