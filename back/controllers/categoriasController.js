const {
    response,
    request
} = require('express');
const Conexion = require('../database/conexionCategorias');
const bcrypt = require('bcrypt');


//Óscar
const listAllCategorias = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllCategorias()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
         
            res.status(404).json()
        })
}
const listAllCategoriasAgrupadas = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllCategoriasAgrupadas(null)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
  
            res.status(404).json()
        })
}
const listCategoriaAgrupada = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getCategoriaAgrupada(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {

            res.status(404).json('No exite una categoria con ese id')
        })
}

const listCategoria = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getCategoriaById(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {

            res.status(404).json('No exite una categoria con ese id')
        })
}
const listCategoriaByNombre = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getCategoriaByNombre(req.params.nombre)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {

            res.status(404).json('No exite una categoria con ese nombre')
        })
}


const editCategoria= (req, res = response)=>{
    const conexion = new Conexion()
    conexion.updateFullCategoria(req.params.id,req.body)
    .then(data => {
        res.status(202).json('Actualizado correctamente')
    })
    .catch(err => {
      
        res.status(203).json('Error al actualizar')
    });

}

const createCategoria = (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertCategoria(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
 
            res.status(203).json('Error en el registro')
        })
}

const removeCategoria = (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteCategoria(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {

            res.status(203).json('Error en la eliminacion')
        })
}

module.exports={
    listAllCategorias,
    listCategoria,
    removeCategoria,
    editCategoria,
    createCategoria,
    listAllCategoriasAgrupadas,
    listCategoriaAgrupada,
    listCategoriaByNombre,
}