const { Asistencia } = require('../models');
const faker = require('@faker-js/faker');

const asistenciasFactory = async (ctos = 1) => {
    let factory = [];

    for (let i = 1; i <= ctos; i++) {
        let asistencia = {
            idEvento: faker.random.number({ min: 1, max: 10 }),
            idUsuario: faker.random.number({ min: 1, max: 10 }),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        factory.push(asistencia);
    }

    return Asistencia.bulkCreate(factory);
};

module.exports = {
    asistenciasFactory
};