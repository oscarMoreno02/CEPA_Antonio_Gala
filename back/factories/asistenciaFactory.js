const { Asistencia } = require('../models');
const faker = require('@faker-js/faker');

const asistenciasFactory = async (ctos = 1) => {
    let factory = [];

    for (let i = 1; i <= ctos; i++) {
        let asistencia = {
            idEvento: 1,
            idUsuario: i,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        factory.push(asistencia);
    }
    return factory
};

module.exports = {
    asistenciasFactory
};