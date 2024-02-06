const { Evento } = require('../models');
const faker = require('@faker-js/faker');

const eventosFactory = async (ctos = 18) => {
    let factory = [];

    for (let i = 1; i <= ctos; i++) {
        let evento = {
            nombre: `Evento ${i}`,
            descripcion: `Descripción del evento ${i}`,
            fecha: new Date().toLocaleDateString(),
            hora: new Date().toLocaleTimeString(),
            foto: `imagen_evento_${i}.jpg`,
            mg: faker.random.number(100),
            visibilidad: Math.random() < 0.5 ? 'Público' : 'Privado',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        factory.push(evento);
    }

    const eventos = await Evento.bulkCreate(factory);

    return eventos;
};

module.exports = {
    eventosFactory
};
