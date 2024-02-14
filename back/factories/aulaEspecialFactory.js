const { AulaEspecial } = require('../models')
const faker = require('@faker-js/faker')

const aulaEspecialFactory = async (ctos = 1) => {
    let factory = []

    for (let i = 1; i <= ctos; i++) {
        let aulaEspecial = {
            nombre: `Aula ${i}`,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        console.log(i)
        factory.push(aulaEspecial)
    }
    return factory
}

module.exports = {
    aulaEspecialFactory
}