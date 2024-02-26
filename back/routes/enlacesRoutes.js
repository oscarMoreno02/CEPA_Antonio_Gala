require('express-group-routes')
const {Router, text} = require('express');
const router = Router();
const { check } = require('express-validator');
const {validateValues}=require('../helpers/validar-campos')
const validator=require('../helpers/enlaces-validators')

const controller=require('../controllers/enlacesController')
const authMid=require('../middlewares/validarJWT')
const accessMid=require('../middlewares/validarRoles')
//Óscar
    router.get('/seccion/:id',controller.listEnlacesBySeccion)
    router.get('/:id',controller.listEnlace)
    router.get('',controller.listAllEnlaces)
    
    router.delete('/:id',authMid.validarJWT,accessMid.esAdmin,controller.removeEnlace)
    
    router.put('/:id',
    [
        check('textoClave','Tamaño del texto clave incorrecto ').trim().isLength({ min: 5,  max: 30  }),
        check('url','Formato de enlace incorrecto').isURL(),
        check('idSeccion').custom(validator.seccionExiste),
        validateValues
    ],authMid.validarJWT,accessMid.esAdmin,controller.editEnlace)
    
    router.post('',
    [
        check('textoClave','Tamaño del texto clave incorrecto ').trim().isLength({ min: 5, max: 30 }),
        check('url','Formato de enlace incorrecto').isURL(),
        check('idSeccion').custom(validator.seccionExiste),
        validateValues
    ],authMid.validarJWT,accessMid.esAdmin,controller.createEnlace)

    module.exports = router;