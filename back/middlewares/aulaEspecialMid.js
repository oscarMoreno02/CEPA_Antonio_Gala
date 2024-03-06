//Jaime

const { response, request } = require('express')
const ConexionAulas = require('../database/conexionAulaEspecial')

const nombreEnUsoAula = (req, res, next) => {
    const conx = new ConexionAulas()

            conx.getAulaByNombre(req.body.nombre)
            .then(msg => {
                res.status(400).json({msg: 'Nombre en uso'})
            })
            .catch(err => {
                next()
            })

        }
   
   


module.exports = {
    nombreEnUsoAula,
}