//Jaime

const {
    response,
    request
} = require('express');
const Conexion = require('../database/conexionAulaFranja');
const bcrypt = require('bcrypt');

const listAllFranjas = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllFranjas()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
      
            res.status(404).json()
        })
}

const listFranja = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getFranjaById(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
        
            res.status(404).json('No exite una franja con ese id')
        })
}

const createFranja = async (req, res = response) => {
    const conexion = new Conexion()

    conexion.insertFranja(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {
           
            res.status(400).json('Error en el registro')
        })
}

const editFranja = (req, res = response) => {
    const conexion = new Conexion()
    conexion.updateFranja(req.params.id, req.body)
        .then(data => {
            res.status(202).json('Actualizado correctamente')
        })
        .catch(err => {
      
            res.status(203).json('Error al actualizar')
        });

}

const removeFranja = (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteFranja(req.params.id)
        .then(msg => {
            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
          
            res.status(203).json('Error en la eliminacion')
        })
}
const sortFranjas = (req, res = response) => {
    const conexion = new Conexion()
    conexion.sortFranjas(req.body)
        .then(data => {
            res.status(202).json('Actualizado correctamente')
        })
        .catch(err => {
          
            res.status(203).json('Error al actualizar')
        });
}


module.exports = {
    listAllFranjas,
    listFranja,
    createFranja,
    editFranja,
    removeFranja,
    sortFranjas
}