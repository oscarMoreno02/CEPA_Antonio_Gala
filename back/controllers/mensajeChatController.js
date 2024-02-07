const { response, request } = require('express');
const mensajeChatConexion = require('../database/conexionMensajeCaht');

const obtenerMensajes = (req, res = response) => {
    const conx = new mensajeChatConexion();

    conx.getMensajesChats()
        .then((mensajes) => {
            console.log('Listado correcto!');
            res.status(200).json(mensajes);
        })
        .catch((err) => {
            console.log('No hay registros');
            res.status(203).json({ 'msg': 'No se han encontrado registros' });
        });
}

const obtenerMensajeChatPorId = (req, res = response) => {
    const conx = new mensajeChatConexion();

    conx.getMensajeChatPorId(req.params.id)
        .then((mensaje) => {
            console.log('Listado correcto!');
            res.status(200).json(mensaje);
        })
        .catch((err) => {
            console.log('No hay registro!');
            res.status(203).json({ 'msg': 'No se ha encontrado el registro' });
        });
}

const subirMensajeChat = (req = request, res = response) => {
    const conx = new mensajeChatConexion();

    conx.postMensajeChat(req.body)
        .then((mensaje) => {
            console.log('Insertado correctamente!');
            res.status(201).json(mensaje);
        })
        .catch((err) => {
            console.log('Fallo en el registro!');
            res.status(203).json(err);
        });
}

const borrarMensajeChat = (req, res = response) => {
    const conx = new mensajeChatConexion();

    conx.deleteMensajeChat(req.params.id)
        .then((mensaje) => {
            console.log('Eliminado correctamente!');
            res.status(202).json(mensaje);
        })
        .catch((err) => {
            console.log('Fallo en la eliminación!');
            res.status(203).json(err);
        });
}

module.exports = {
    obtenerMensajes,
    obtenerMensajeChatPorId,
    subirMensajeChat,
    borrarMensajeChat
}
