require('express-group-routes')
const {Router} = require('express');
const router = Router();
const { check } = require('express-validator');
const {validateValues}=require('../helpers/validar-campos')
const validator=require('../helpers/noticia-validators')

const controller=require('../controllers/noticiasController')

    router.get('/categoria/:id',controller.listNoticiasByCategorias)
    router.get('/secciones/:id',controller.listNoticiaWithSecciones)
    router.get('/secciones',controller.listAllNoticiasWithSecciones)
    router.get('/:id',controller.listNoticia)
    router.get('/',controller.listAllNoticias)
    router.delete('/:id',controller.removeNoticia)

    router.put('/:id',
    [
        check('titulo', 'Tamaño de titulo incorrecto').trim().isLength({ min: 5 }),
        check('idCategoria').custom(validator.categoriaExiste),
        validateValues
    ],controller.editNoticia)

    router.post('',   
    [
        check('titulo', 'Tamaño de titulo incorrecto').trim().isLength({ min: 5 }),
        check('idCategoria').custom(validator.categoriaExiste),
        validateValues
    ],controller.createNoticia)

    module.exports = router;