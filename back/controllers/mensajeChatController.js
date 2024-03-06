/*Laura María Pedraza Gómez* */
const { response, request } = require('express');
const mensajeChatConexion = require('../database/conexionMensajeChat');

const obtenerMensajes = (req, res = response) => {
    const conx = new mensajeChatConexion();

    conx.getMensajesChats()
        .then((mensajes) => {
     
            res.status(200).json(mensajes);
        })
        .catch((err) => {
           
            res.status(404).json({ 'msg': 'No se han encontrado registros' });
        });
}

const obtenerMensajeChatPorId = (req, res = response) => {
    const conx = new mensajeChatConexion();

    conx.getMensajeChatPorId(req.params.id)
        .then((mensaje) => {
        
            res.status(200).json(mensaje);
        })
        .catch((err) => {
     
            res.status(404).json({ 'msg': 'No se ha encontrado el registro' });
        });
}

const subirMensajeChat = (req = request, res = response) => {
    const conx = new mensajeChatConexion();

    conx.postMensajeChat(req.body)
        .then((mensaje) => {
     
            res.status(200).json(mensaje);
        })
        .catch((err) => {
      
            res.status(404).json(err);
        });
}

const borrarMensajeChat = (req, res = response) => {
    const conx = new mensajeChatConexion();

    conx.deleteMensajeChat(req.params.id)
        .then((mensaje) => {
        
            res.status(200).json(mensaje);
        })
        .catch((err) => {
 
            res.status(404).json(err);
        });
}

module.exports = {
    obtenerMensajes,
    obtenerMensajeChatPorId,
    subirMensajeChat,
    borrarMensajeChat
}
