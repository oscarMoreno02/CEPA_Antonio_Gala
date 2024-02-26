/*Laura María Pedraza Gómez* */
const { response, request } = require('express');
const ChatConexion = require('../database/conexionChat');

const obtenerChats = (req, res = response) => {
    const conx = new ChatConexion();

    conx.getChats()
        .then((chats) => {
            console.log('Listado correcto!');
            res.status(200).json(chats);
        })
        .catch((err) => {
            console.log('No hay registros');
            res.status(404).json({ 'msg': 'No se han encontrado registros', 'error':err });
        });
}

const obtenerChatsPorId = (req, res = response) => {
    const conx = new ChatConexion();

    conx.getChatPorId(req.params.id)
        .then((chat) => {
            console.log('Listado correcto!');
            res.status(200).json(chat);
        })
        .catch((err) => {
            console.log('No hay registro!');
            res.status(404).json({ 'msg': 'No se ha encontrado el registro', 'error':err });
        });
}

const subirChat = (req = request, res = response) => {
    const conx = new ChatConexion();

    conx.postChat(req.body)
        .then((chat) => {
            console.log('Insertado correctamente!');
            res.status(200).json(chat);
        })
        .catch((err) => {
            console.log('Fallo en el registro!');
            res.status(404).json({'msg': 'No se ha encontrado el registro', 'error':err});
        });
}

const borrarChat = (req, res = response) => {
    const conx = new ChatConexion();

    conx.deleteChat(req.params.id)
        .then((chat) => {
            console.log('Eliminado correctamente!');
            res.status(200).json(chat);
        })
        .catch((err) => {
            console.log('Fallo en la eliminación!');
            res.status(404).json(err);
        });
}

module.exports = {
    obtenerChats,
    obtenerChatsPorId,
    borrarChat,
    subirChat
}
