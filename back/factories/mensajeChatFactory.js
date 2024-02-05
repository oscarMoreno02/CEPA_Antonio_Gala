const { MensajeChat } = require('../models');

const mensajesChatFactory = async (ctos = 1) => {
    let factory = [];

    for (let i = 1; i <= ctos; i++) {
        let mensaje = {
            idChat: faker.random.number({ min: 1, max: 10 }),
            idUsuario: faker.random.number({ min: 1, max: 10 }),
            mensaje: `Mensaje ${i}`,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        factory.push(mensaje);
    }

    const mensajes = await MensajeChat.bulkCreate(factory);

    return mensajes;
};

module.exports = {
    mensajesChatFactory
};