//Jaime

const { AulaReserva } = require('../models')
const faker = require('@faker-js/faker')

const aulaReservaFactory = async (ctos = 1) => {
    let factory = []

    for (let i = 1; i <= ctos; i++) {
        let aulaReserva = {
            idAula: i,
            idHorario: i,
            idProfesor: i,
            fecha: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        }
        console.log(i)
        factory.push(aulaReserva)
    }
    return factory
}

module.exports = {
    aulaReservaFactory
}