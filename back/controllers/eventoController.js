/*Laura María Pedraza Gómez* */
const { response, request } = require('express');
const EventoConexion = require('../database/conexionEvento');

const obtenerEventos = (req, res = response) => {
    const conx = new EventoConexion();

    conx.getEventos()
        .then((eventos) => {

            res.status(200).json(eventos);
        })
        .catch((err) => {
 
            res.status(404).json({ 'msg': 'No se han encontrado registros' });
        });
}

const obtenerEventoPorId = (req, res = response) => {
    const conx = new EventoConexion();

    conx.getEventoPorId(req.params.id)
        .then((evento) => {
    
            res.status(200).json(evento);
        })
        .catch((err) => {
    
            res.status(404).json({ 'msg': 'No se ha encontrado el registro' });
        });
}

const subirEvento = (req = request, res = response) => {
    const conx = new EventoConexion();

    conx.postEvento(req.body)
        .then((evento) => {
           
            res.status(200).json({id:evento});
        })
        .catch((err) => {
  
            res.status(404).json(err);
        });
}

const borrarEvento = (req, res = response) => {
    const conx = new EventoConexion();

    conx.deleteEvento(req.params.id)
        .then((evento) => {
        
            res.status(200).json(evento);
        })
        .catch((err) => {

            res.status(404).json(err);
        });
}

const actualizarEvento = (req, res = response) => {
    const conx = new EventoConexion();

    conx.updateEvento(req.params.id, req.body)
        .then((evento) => {
        
            res.status(200).json(evento);
        })
        .catch((err) => {
           
            res.status(404).json(err);
        });
}

const aumentarMg = (req, res) => {
    const conx = new EventoConexion()
    conx.plusMgEvento(req.params.id)
        .then((evento) => {
         
            res.status(200).json(evento);
        })
        .catch((err) => {
          
            res.status(404).json(err);
        });
}

const obtenerNumAsistentes = (req, res) => {
    const conx = new EventoConexion()
    conx.getNumAsistentesEvento(req.params.id)
        .then((asistencias) => {

            res.status(200).json(asistencias)
        })
        .catch((err) => {
           
            res.status(404).json(err)
        })
    
}

const eliminarAsistente = (req, res) => {
    const conx = new EventoConexion()
    conx.deleteAsistenteEvento(req.params.id)
        .then((evento) => {
 
            res.status(200).json(evento);
        })
        .catch((err) => {
        
            res.status(404).json(err);
        });
}

const anadirAsistente = (req, res) => {
    const conx = new EventoConexion()
    conx.putAsistenteEvento(req.params.id)
        .then((evento) => {
    
            res.status(200).json(evento);
        })
        .catch((err) => {
   
            res.status(404).json(err);
        });
}

const obtenerEventosActivos = (req, res) => {
    const conx = new EventoConexion();

    conx.getEventosActivos()
        .then((eventos) => {
            console.log('Listado correcto!');
            res.status(200).json(eventos);
        })
        .catch((err) => {
            console.log('No hay registros');
            res.status(404).json({ 'msg': 'No se han encontrado registros' });
        });
}

module.exports = {
    obtenerEventos,
    obtenerEventoPorId,
    actualizarEvento,
    subirEvento,
    borrarEvento,
    aumentarMg,
    obtenerNumAsistentes,
    eliminarAsistente,
    anadirAsistente,
    obtenerEventosActivos
}
