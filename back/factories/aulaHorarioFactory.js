const { AulaHorario } = require('../models')
const faker = require('@faker-js/faker')

const aulaHorarioFactory = async (ctos = 1) => {
    let factory = []

    for (let i = 1; i <= ctos; i++) {
        let aulaHorario = {
            idAula: i,
            idFranja: i,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        console.log(i)
        factory.push(aulaHorario)
    }
    return factory
}

module.exports = {
    aulaHorarioFactory
}