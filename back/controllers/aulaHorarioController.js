//Jaime

const {
    response,
    request
} = require('express');
const Conexion = require('../database/conexionAulaHorario');
const bcrypt = require('bcrypt');

const listAllHorarios = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllHorarios()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
        
            res.status(404).json()
        })
}

const listHorario = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getHorarioById(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json('No exite un horario con ese id')
        })
}
//Óscar
const listAllHorariosOfAula = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllHorariosOfAula(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
        
            res.status(404).json()
        })
}

const createHorario = (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertHorario(req.body)
        .then(data => {
  
            res.status(201).json({id:data})
        })
        .catch(err => {
  
            res.status(203).json('Error en el registro')
        })
}

const editHorario = (req, res = response) => {
    const conexion = new Conexion()
    conexion.updateHorario(req.params.id, req.body)
        .then(data => {
            res.status(202).json('Actualizado correctamente')
        })
        .catch(err => {

            res.status(203).json('Error al actualizar')
        });

}

const removeHorario = (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteHorario(req.params.id)
        .then(msg => {
            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {
          
            res.status(203).json('Error en la eliminacion')
        })
}
//Óscar
const listReservaOfAulaOnDay = (req, res = response) => {
    const conexion = new Conexion()
    let day=req.params.day
    let month=req.params.month
    let year=req.params.year
    let id = req.params.id
    conexion.getReservaByIdAulaOfDay(id,day,month,year)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json('No exite una reserva con ese id')
        })
}
module.exports = {
    listAllHorarios,
    listHorario,
    createHorario,
    editHorario,
    removeHorario,
    listAllHorariosOfAula,
    listReservaOfAulaOnDay
}