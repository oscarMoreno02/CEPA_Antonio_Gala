require('express-group-routes')
const {Router} = require('express');
const router = Router();
const { check } = require('express-validator');
const validatorCategoria=require('../helpers/categoria-validators')
const {validateValues}=require('../helpers/validar-campos')
const authMid=require('../middlewares/validarJWT')
const accessMid=require('../middlewares/validarRoles')
const midCategoria=require('../middlewares/categoriasMid')
const controller=require('../controllers/categoriasController')
//Óscar
    router.get('/agrupadas',controller.listAllCategoriasAgrupadas)
    router.get('/agrupadas/:id',controller.listCategoriaAgrupada)
    router.get('/nombre/:nombre',controller.listCategoriaByNombre)
    router.get('/:id',controller.listCategoria)
    router.get('',controller.listAllCategorias)
    
    router.put('/:id',  
    [
        check('nombre', 'Tamaño de nombre incorrecto').trim().isLength({ min: 3 }),
        check('dependiente').custom(validatorCategoria.dependienteExiste),
        validateValues
    ],authMid.validarJWT,accessMid.esAdmin,midCategoria.mismoDependiente,midCategoria.nombreEnUso,controller.editCategoria)

    
    router.delete('/:id',authMid.validarJWT,accessMid.esAdmin,controller.removeCategoria)

    router.post('',
    [   check('nombre', 'Tamaño de nombre incorrecto').trim().isLength({ min: 3 }),
        check('nombre').custom(validatorCategoria.nombreExiste),
        check('dependiente').custom(validatorCategoria.dependienteExiste),
        validateValues
    ],authMid.validarJWT,accessMid.esAdmin,controller.createCategoria)

    module.exports = router;