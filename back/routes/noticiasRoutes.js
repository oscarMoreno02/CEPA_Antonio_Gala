require('express-group-routes')
const {Router} = require('express');
const router = Router();
const { check } = require('express-validator');
const {validateValues}=require('../helpers/validar-campos')
const validator=require('../helpers/noticia-validators')
const authMid=require('../middlewares/validarJWT')
const accessMid=require('../middlewares/validarRoles')
const controller=require('../controllers/noticiasController')
//Óscar
    router.get('/last',controller.listUltimasNoticiasWithSecciones)
    router.get('/categoria/:id',controller.listNoticiasByCategorias)
    router.get('/secciones/:id',controller.listNoticiaWithSecciones)
    router.get('/secciones',controller.listAllNoticiasWithSecciones)
    router.get('/:id',controller.listNoticia)
    router.get('/',controller.listAllNoticias)

    router.delete('/:id',authMid.validarJWT,accessMid.esAdmin,controller.removeNoticia)

    router.put('/:id',
    [
        check('titulo', 'Tamaño de titulo incorrecto').trim().isLength({ min: 5 }),
        check('idCategoria').custom(validator.categoriaExiste),
        validateValues
    ],authMid.validarJWT,accessMid.esAdmin,controller.editNoticia)

    router.post('',   
    [
        check('titulo', 'Tamaño de titulo incorrecto').trim().isLength({ min: 5 }),
        check('idCategoria').custom(validator.categoriaExiste),
        validateValues
    ],authMid.validarJWT,accessMid.esAdmin,controller.createNoticia)

    module.exports = router;