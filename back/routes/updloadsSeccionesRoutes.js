const { Router } = require('express');

const { validarArchivoSubir } = require('../middlewares/validar-archivo');
const { cargarArchivo, actualizarImagen, obtenerImagen, borrarImagen } = require('../controllers/uploadsSeccionesController');
const authMid=require('../middlewares/validarJWT')
const accessMid=require('../middlewares/validarRoles')
const remoteController=require('../controllers/RemoteUploadsSeccionesController')
//Óscar
const router = Router();


router.post( '/',authMid.validarJWT,accessMid.esAdmin, validarArchivoSubir, cargarArchivo );

router.put('/:id',authMid.validarJWT,accessMid.esAdmin, validarArchivoSubir,actualizarImagen )

router.delete('/:id',authMid.validarJWT,accessMid.esAdmin, borrarImagen  )


router.get('/:id', obtenerImagen  )  

module.exports = router;