const {
    response,
    request
} = require('express');
const Conexion = require('../database/conexionCategorias');

const mismoDependiente = (req, res, next) => {

    if (req.params.id == req.body.dependiente) {
        res.status(400).json('No se puede asignar una dependencia a la misma categoria')
    } else {
        next()
    }
}
const nombreEnUso = (req, res, next) => {

    const conexion= new Conexion()
    console.log(req.params.id)
    conexion.getCategoriaById(req.params.id)
    .then(data=>{
            if(data.nombre==req.nombre){
                next()
            }else{
                conexion.getCategoriaByNombre(req.nombre)
                .then(msg=>{

                    res.status(400).json('Nombre en uso')
                })
                .catch(error=>{
                    next()
                })
            }
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json({msg:'No exite una tarea con ese id'})
    })
}
module.exports = {
  mismoDependiente,
  nombreEnUso
}