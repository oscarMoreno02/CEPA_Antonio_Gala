const { MensajeChat } = require('../models');

const mensajesChatFactory = async (ctos = 1) => {
    let factory = [];

    for (let i = 1; i <= ctos; i++) {
        let mensaje = {
            idChat: 1,
            idUsuario: i,
            mensaje: 'Mensaje ${i}',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        factory.push(mensaje);
    }



    return factory;
};

module.exports = {
    mensajesChatFactory
};