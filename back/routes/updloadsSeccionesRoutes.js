const { Router } = require('express');

const { validarArchivoSubir } = require('../middlewares/validar-archivo');
const { cargarArchivo, actualizarImagen, obtenerImagen, borrarImagen } = require('../controllers/uploadsSeccionesController');



const router = Router();


router.post( '/', validarArchivoSubir, cargarArchivo );

router.put('/:id', validarArchivoSubir, actualizarImagen )

router.delete('/:id', borrarImagen  )


router.get('/:id', obtenerImagen  )  

module.exports = router;