//Jaime

const { response, request } = require('express')
const ConexionFranjas = require('../database/conexionAulaFranja')

const aulaFranjaExiste = (idFranja) => {
    return new Promise((resolve, reject) => {
        const conx = new ConexionFranjas()
        conx.getAulaById(idFranja)
        .then(msg => {
            console.log(msg)
            resolve(true)
        })
        .catch(err => {
            reject(new Error('La franja seleccionada no existe'))
        })
    })
}

module.exports = { 
    aulaFranjaExiste,
}