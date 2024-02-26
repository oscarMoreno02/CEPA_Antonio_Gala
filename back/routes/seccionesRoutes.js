require('express-group-routes')
const {Router} = require('express');
const router = Router();
const { check } = require('express-validator');
const {validateValues}=require('../helpers/validar-campos')
const validator=require('../helpers/secciones-validators')
const authMid=require('../middlewares/validarJWT')
const accessMid=require('../middlewares/validarRoles')
const controller=require('../controllers/seccionesController')

//Óscar
    router.get('/noticia/:id',controller.listSeccionesByNoticia)
    router.get('/enlaces/:id',controller.listSeccionWithEnlaces)
    router.get('/enlaces',controller.listAllSeccionesWithEnlaces)
    router.get('/:id',controller.listSeccion)
    router.get('/',controller.listAllSecciones)
    router.delete('/:id',controller.removeSeccion)

    router.put('/:id',
    [
        check('texto', 'Tamaño de texto incorrecto').trim().isLength({ min: 5 }),
        check('idNoticia').custom(validator.noticiaExiste),
        validateValues
    ],authMid.validarJWT,accessMid.esAdmin,controller.editSeccion)

    router.post('',   
    [
        check('texto', 'Tamaño de texto incorrecto').trim().isLength({ min: 5 }),
        check('idNoticia').custom(validator.noticiaExiste),
        validateValues
    ],authMid.validarJWT,accessMid.esAdmin,controller.createSeccion)

    module.exports = router;