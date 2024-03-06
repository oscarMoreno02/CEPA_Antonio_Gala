//Jaime

const { response, request } = require('express')
const ConexionReservas = require('../database/conexionAulaReserva')

const aulaReservaExiste = (idReserva) => {
    return new Promise((resolve, reject) => {
        const conx = new ConexionReservas()
        conx.getReservaById(idReserva)
        .then(msg => {
            resolve(true)
        })
        .catch(err => {
            reject(new Error('La reserva seleccionada no existe'))
        })
    })
}

module.exports = { 
    aulaReservaExiste,
}