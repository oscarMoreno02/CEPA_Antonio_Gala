const { Evento } = require('../models');
const faker = require('@faker-js/faker');

const eventosFactory = async (ctos = 18) => {
    let factory = [];

    for (let i = 1; i <= ctos; i++) {
        let evento = {
            nombre: `Evento ${i}`,
            descripcion: `Descripción del evento ${i}`,
            fecha: new Date().toString(),
            hora: new Date().toString(),
            foto: `https://picsum.photos/id/237/200/300`,
            mg:0,
            visibilidad: Math.random() < 0.5 ? 'Público' : 'Privado',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        console.log(i)
        factory.push(evento);
    }


    return factory;
};

module.exports = {
    eventosFactory
};
