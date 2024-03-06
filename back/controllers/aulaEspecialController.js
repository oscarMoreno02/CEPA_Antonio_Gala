//Jaime

const {
    response,
    request
} = require('express');
const Conexion = require('../database/conexionAulaEspecial');
const bcrypt = require('bcrypt');

const listAllAulas = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllAulas()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
   
            res.status(404).json()
        })
}

const listAula = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAulaById(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json('No exite un aula especial con ese id')
        })
}
//Óscar
const listAulaWithData = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAulaByIdWithData(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
       
            res.status(404).json('No exite un aula especial con ese id')
        })
}
const createAula = (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertAula(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
       
            res.status(400).json('Error en el registro')
        })
}

const editAula = (req, res = response) => {
    const conexion = new Conexion()
    conexion.updateAula(req.params.id, req.body)
        .then(data => {
            res.status(202).json('Actualizado correctamente')
        })
        .catch(err => {

            res.status(203).json('Error al actualizar')
        });

}

const removeAula = (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteAula(req.params.id)
        .then(msg => {
            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {

            res.status(500).json('Error en la eliminacion')
        })
}

module.exports = {
    listAllAulas,
    listAula,
    createAula,
    editAula,
    removeAula,
    listAulaWithData
}