//Jaime

const {
    response,
    request
} = require('express');
const Conexion = require('../database/conexionAulaReserva');
const bcrypt = require('bcrypt');

const listAllReservas = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllReservas()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json()
        })
}

const listReserva = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getReservaById(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json('No exite una reserva con ese id')
        })
}

const createReserva = (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertReserva(req.body)
        .then(data => {
            res.status(201).json('Reserva registrada correctamente')
        })
        .catch(err => {
            console.log(err)
            res.status(203).json('Error en el registro')
        })
}

const editReserva = (req, res = response) => {
    const conexion = new Conexion()
    conexion.updateReserva(req.params.id, req.body)
        .then(data => {
            res.status(202).json('Actualizado correctamente')
        })
        .catch(err => {
            console.log(err);
            res.status(203).json('Error al actualizar')
        });

}

const removeReserva = (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteReserva(req.params.id)
        .then(msg => {
            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
            console.log(err)
            res.status(203).json('Error en la eliminacion')
        })
}
const listAllReservasOfClaseWithData = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllReservasOfAulaWithData(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json()
        })
}


module.exports = {
    listAllReservas,
    listReserva,
    createReserva,
    editReserva,
    removeReserva,
    listAllReservasOfClaseWithData
}