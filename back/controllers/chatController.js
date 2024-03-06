/*Laura María Pedraza Gómez* */
const { response, request } = require('express');
const ChatConexion = require('../database/conexionChat');

const obtenerChats = (req, res = response) => {
    const conx = new ChatConexion();

    conx.getChats()
        .then((chats) => {
  
            res.status(200).json(chats);
        })
        .catch((err) => {
        
            res.status(404).json({ 'msg': 'No se han encontrado registros', 'error':err });
        });
}

const obtenerChatsPorId = (req, res = response) => {
    const conx = new ChatConexion();

    conx.getChatPorId(req.params.id)
        .then((chat) => {
          
            res.status(200).json(chat);
        })
        .catch((err) => {

            res.status(404).json({ 'msg': 'No se ha encontrado el registro', 'error':err });
        });
}

const subirChat = (req = request, res = response) => {
    const conx = new ChatConexion();

    conx.postChat(req.body)
        .then((chat) => {
       
            res.status(200).json(chat);
        })
        .catch((err) => {

            res.status(404).json({'msg': 'No se ha encontrado el registro', 'error':err});
        });
}

const borrarChat = (req, res = response) => {
    const conx = new ChatConexion();

    conx.deleteChat(req.params.id)
        .then((chat) => {
          
            res.status(200).json(chat);
        })
        .catch((err) => {
           
            res.status(404).json(err);
        });
}

module.exports = {
    obtenerChats,
    obtenerChatsPorId,
    borrarChat,
    subirChat
}
