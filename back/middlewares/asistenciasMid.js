const {response,request} = require('express');
const Conexion = require('../database/conexionAsistencia');
/*Laura María Pedraza Gómez* */
const asistenciaExiste = () => {
    return async (req, res, next) => {
        const { idEvento, idUsuario } = req.body;

        const conexion = new Conexion();
        try {
            const asistencias = await conexion.getAsistenciaEventoUsuario(idEvento, idUsuario);
            if (asistencias && asistencias.length >  0) {
                return res.status(400).json({ msg: 'Usuario ya registrado en el evento' });
            }
            next();
        } catch (err) {
            return res.status(500).json({ msg: 'Error al verificar la asistencia', error: err.message });
        }
    };
};

module.exports = {
    asistenciaExiste
}
