//Jaime

const { response, request } = require('express')
const ConexionAulas = require('../database/conexionAulaEspecial')

const nombreEnUsoAula = (req, res, next) => {
    const conx = new ConexionAulas()
    conx.getAulaById(req.params.id)
    .then(data => {
        if (data.nombre.toLowerCase() == req.body.nombre.toLowerCase()) {
            next()
        } else {
            conx.getAulaByNombre(req.body.nombre)
            .then(msg => {
                res.status(400).json({msg: 'Nombre en uso'})
            })
            .catch(err => {
                next()
            })
        }
    })
    .catch(err => {
        console.error(err)
        res.status(400).json({msg: 'No existe un aula con ese id'})
    })
}

module.exports = {
    nombreEnUsoAula,
}