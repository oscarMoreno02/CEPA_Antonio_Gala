//Jaime

const { response, request } = require('express')
const ConexionHorarios = require('../database/conexionAulaHorario')

const aulaHorarioExiste = (idHorario) => {
    return new Promise((resolve, reject) => {
        const conx = new ConexionHorarios()
        conx.getHorarioById(idHorario)
        .then(msg => {
            resolve(true)
        })
        .catch(err => {
            reject(new Error('El horario seleccionado no existe'))
        })
    })
}

module.exports = { 
    aulaHorarioExiste,
}