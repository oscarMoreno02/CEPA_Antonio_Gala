//Jaime

const { AulaFranja } = require('../models')
const faker = require('@faker-js/faker')

const aulaFranjaFactory = async (ctos = 1) => {
    let factory = []

    for (let i = 1; i <= ctos; i++) {
        let horaInicio = new Date()
        let horaFin = new Date(horaInicio.getTime())
        horaFin.setHours(horaInicio.getHours() + 1)

        let aulaFranja = {
            turno: 'Diurno',
            horaInicio: horaInicio,
            horaFin: horaFin,
            orden:1,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        factory.push(aulaFranja)
    }
    return factory
}

module.exports = {
    aulaFranjaFactory
}