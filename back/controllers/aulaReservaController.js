//Jaime

const {
    response,
    request
} = require('express');
const Conexion = require('../database/conexionAulaReserva');
const bcrypt = require('bcrypt');
const mailHelper = require('../helpers/send-mail')
const listAllReservas = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllReservas()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}

const listReserva = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getReservaById(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json('No exite una reserva con ese id')
        })
}

const createReserva = (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertReserva(req.body)
        .then(data => {
            res.status(201).json('Reserva registrada correctamente')
        })
        .catch(err => {
       
            res.status(203).json('Error en el registro')
        })
}

const editReserva = (req, res = response) => {
    const conexion = new Conexion()
    conexion.updateReserva(req.params.id, req.body)
        .then(data => {
            res.status(202).json('Actualizado correctamente')
        })
        .catch(err => {
   
            res.status(203).json('Error al actualizar')
        });

}
//Óscar
const removeReserva = async (req, res = response) => {
    const conexion = new Conexion()
    let reserva = await conexion.getReservaWithDataByID(req.params.id)
    const url = new URL(req.url, `http://${req.headers.host}`);
    const queryParams = url.searchParams;
    const notify = queryParams.get('notify');
    conexion.deleteReserva(req.params.id)
        .then(msg => {
            res.status(202).json('Exito en la eliminacion')
            if (notify === 'true') {

                try {
                    mailBody = {
                        horario: reserva.horario.franja.horaInicio + ' - ' + reserva.horario.franja.horaFin,
                        fecha: reserva.fecha,
                        aula: reserva.aula.nombre,
                        email: reserva.profesor.email
                    }
            
                    mailHelper.enviarCorreo(mailBody)
                } catch (err) {
        
                }
            } else {
       
            }
        })
        .catch(err => {
          
            res.status(203).json('Error en la eliminacion')
        })

}
//Óscar
const listAllReservasOfClaseWithData = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllReservasOfAulaWithData(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
         
            res.status(404).json()
        })
}


//Óscar
const listAllReservasOfProfesorWithData = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllReservasOfProfesorWithData(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}
//Óscar
const listAllReservasWithData = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllReservasWithData()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
  
            res.status(404).json()
        })
}

module.exports = {
    listAllReservas,
    listReserva,
    createReserva,
    editReserva,
    removeReserva,
    listAllReservasOfClaseWithData,
    listAllReservasWithData,
    listAllReservasOfProfesorWithData
}