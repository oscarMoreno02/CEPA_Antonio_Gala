//Jaime

const { response, request } = require('express')
const ConexionFranjas = require('../database/conexionAulaFranja')

const horaInicioSuperiorHoraFinal = (req, res, next) => {
    // const conx = new ConexionFranjas()
    // console.log(req.params.id)
    // conx.getFranjaById(req.params.id)
    // .then(data => {
    //     if (data.horaInicio < data.horaFin) {
    //         next()
    //     } else {
    //         res.status(400).json({msg: 'La hora de inicio no puede ser superior a la hora final'})
    //     }
    // })
    // .catch(err => {
    //     console.error(err)
    //     res.status(400).json({msg: 'No existe una franja con ese id'})
    // })
    next()
}

module.exports = {
    horaInicioSuperiorHoraFinal,
}