require('express-group-routes')
const {Router} = require('express');
const router = Router();
const { check } = require('express-validator');
const {validateValues}=require('../helpers/validar-campos')
const validator=require('../helpers/enlaces-validators')
// const midCategoria=require('../middlewares/categoriasMid')
const controller=require('../controllers/enlacesController')

    router.get('/seccion/:id',controller.listEnlacesBySeccion)
    router.get('/:id',controller.listEnlace)
    router.get('',controller.listAllEnlaces)
    router.delete('/:id',controller.removeEnlace)
    
    router.put('/:id',
    [
        check('textClave','Tamaño del texto clave incorrecto ').trim().isLength({ min: 5 }),
        check('url','Formato de enlace incorrecto').isURL(),
        check('idSeccion').custom(validator.seccionExiste),
        validateValues
    ],
    controller.editEnlace)
    router.post('',
    [
        check('textClave','Tamaño del texto clave incorrecto ').trim().isLength({ min: 5 }),
        check('url','Formato de enlace incorrecto').isURL(),
        check('idSeccion').custom(validator.seccionExiste),
        validateValues
    ],
    controller.createEnlace)

    module.exports = router;