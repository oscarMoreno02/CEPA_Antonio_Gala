//Jaime

const { response, request } = require('express')
const ConexionAulas = require('../database/conexionAulaEspecial')

const aulaEspecialExiste = (idAula) => {
    return new Promise((resolve, reject) => {
        const conx = new ConexionAulas()
        conx.getAulaById(idAula)
        .then(msg => {
            resolve(true)
        })
        .catch(err => {
            reject(new Error('La clase seleccionada no existe'))
        })
    })
}

module.exports = { 
    aulaEspecialExiste,
}