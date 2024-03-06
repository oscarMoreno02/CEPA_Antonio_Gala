const {
    response,
    request
} = require('express');
const Conexion = require('../database/conexionSecciones');
const bcrypt = require('bcrypt');
//Óscar
const listAllSecciones= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllSecciones()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}

const listSeccion= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getSeccionById(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
       
            res.status(404).json('No exite un noticia con ese id')
        })
}
const listSeccionesByNoticia= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getSeccionByNoticia(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {

            res.status(404).json('No exite una categoria con ese id')
        })
}


const editSeccion= (req, res = response)=>{
    const conexion = new Conexion()
    conexion.updateFullSeccion(req.params.id,req.body)
    .then(data => {
        res.status(202).json('Actualizado correctamente')
    })
    .catch(err => {

        res.status(203).json('Error al actualizar')
    });

}

const createSeccion= (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertSeccion(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
        
            res.status(203).json('Error en el registro')
        })
}

const removeSeccion= (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteSeccion(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
      
            res.status(203).json('Error en la eliminacion')
        })
}
const listAllSeccionesWithEnlaces= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllSeccionesWithEnlaces()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
          
            res.status(404).json()
        })
}
const listSeccionWithEnlaces = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getSeccionWithEnlaces(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
     
            res.status(404).json()
        })
}
module.exports={
    listAllSecciones,
    listSeccion,
    removeSeccion,
    editSeccion,
    createSeccion,
    listSeccionesByNoticia,
    listAllSeccionesWithEnlaces,
    listSeccionWithEnlaces
}