const {
    response,
    request
} = require('express');
const Conexion = require('../database/conexionEnlaces');
const bcrypt = require('bcrypt');
//Óscar
const listAllEnlaces= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllEnlaces()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json()
        })
}

const listEnlace = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getEnlaceById(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json('No exite un enlace con ese id')
        })
}
const listEnlacesBySeccion= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getEnlaceBySeccion(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json('No exite una seccion con ese id')
        })
}


const editEnlace= (req, res = response)=>{
    const conexion = new Conexion()
    conexion.updateFullEnlace(req.params.id,req.body)
    .then(data => {
        res.status(202).json('Actualizado correctamente')
    })
    .catch(err => {
        console.log(err);
        res.status(203).json('Error al actualizar')
    });

}

const createEnlace = (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertEnlace(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
            console.log(err)
            res.status(203).json('Error en el registro')
        })
}

const removeEnlace = (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteEnlace(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
            console.log(err)
            res.status(203).json('Error en la eliminacion')
        })
}

module.exports={
    listAllEnlaces,
    listEnlace,
    removeEnlace,
    editEnlace,
    createEnlace,
    listEnlacesBySeccion,
}