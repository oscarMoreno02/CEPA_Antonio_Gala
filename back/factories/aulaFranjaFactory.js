const { AulaFranja } = require('../models')
const faker = require('@faker-js/faker')

const aulaFranjaFactory = async (ctos = 1) => {
    let factory = []

    for (let i = 1; i <= ctos; i++) {
        let horaInicio = new Date()
        let horaFin = new Date(horaInicio.getTime())
        horaFin.setHours(horaInicio.getHours() + 1)

        let aulaFranja = {
            turno: 1,
            horaInicio: horaInicio,
            horaFin: horaFin,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        console.log(i)
        factory.push(aulaFranja)
    }
    return factory
}

module.exports = {
    aulaFranjaFactory
}