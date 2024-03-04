const {response,request} = require('express');
const Conexion = require('../database/conexionEvento');
/*Laura María Pedraza Gómez* */
const quedanPlazas = (req, res, next) => {
    
        const conexion = new Conexion();
        try {
            conexion.getNumAsistentesEvento(req.params.id)
            .then (numAsistentes => {
                if (numAsistentes <= 0) {
                    return res.status(400).json({ msg: 'No quedan plazas para el evento' });
                } 
                next();
            })
            .catch(error=>{
                next()
            })     
        } catch (err) {
            return res.status(500).json({ msg: 'Error al obtener el número de asistentes restantes', error: err.message });
        }
    
};


module.exports = {
    quedanPlazas
}
