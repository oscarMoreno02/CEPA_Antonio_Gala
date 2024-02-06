const { response, request } = require('express');
const EventoConexion = require('../database/conexionEvento');

const obtenerEventos = (req, res = response) => {
    const conx = new EventoConexion();

    conx.getEventos()
        .then((eventos) => {
            console.log('Listado correcto!');
            res.status(200).json(eventos);
        })
        .catch((err) => {
            console.log('No hay registros');
            res.status(203).json({ 'msg': 'No se han encontrado registros' });
        });
}

const obtenerEventoPorId = (req, res = response) => {
    const conx = new EventoConexion();

    conx.getEventoPorId(req.params.id)
        .then((evento) => {
            console.log('Listado correcto!');
            res.status(200).json(evento);
        })
        .catch((err) => {
            console.log('No hay registro!');
            res.status(203).json({ 'msg': 'No se ha encontrado el registro' });
        });
}

const subirEvento = (req = request, res = response) => {
    const conx = new EventoConexion();

    conx.postEvento(req.body)
        .then((evento) => {
            console.log('Insertado correctamente!');
            res.status(201).json(evento);
        })
        .catch((err) => {
            console.log('Fallo en el registro!');
            res.status(203).json(err);
        });
}

const borrarEvento = (req, res = response) => {
    const conx = new EventoConexion();

    conx.deleteEvento(req.params.id)
        .then((evento) => {
            console.log('Eliminado correctamente!');
            res.status(202).json(evento);
        })
        .catch((err) => {
            console.log('Fallo en la eliminación!');
            res.status(203).json(err);
        });
}

const actualizarEvento = (req, res = response) => {
    const conx = new EventoConexion();

    conx.updateEvento(req.params.id, req.body)
        .then((evento) => {
            console.log('Modificado correctamente!');
            res.status(202).json(evento);
        })
        .catch((err) => {
            console.log('Fallo en la modificación!');
            res.status(203).json(err);
        });
}

module.exports = {
    obtenerEventos,
    obtenerEventoPorId,
    actualizarEvento,
    subirEvento,
    borrarEvento
}