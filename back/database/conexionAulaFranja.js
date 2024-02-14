require('dotenv').config()
const bcrypt = require('bcrypt')
const {
    Sequelize,
    sequelize,
    Op,
    where
} = require('sequelize')
const models = require('../models/index.js')

class ConexionAulaFranja {
    constructor() {
        this.db = new Sequelize(process.env.DB_DEV, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        })
    }

    conectar = () => {
        this.db.authenticate().then(() => {
            console.log('Connection has been established successfully.')
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error)
        })
    }
    desconectar = () => {
        process.on('SIGINT', () => conn.close())
    }

    getAllFranjas = async () => {
        try {
            let resultado = []
            this.conectar()
            resultado = await models.AulaFranja.findAll()
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
    getFranjaById = async (id) => {
        try {
            let resultado = [];
            this.conectar();
            resultado = await models.AulaFranja.findByPk(id)
            if (!resultado) {
                throw new Error('error')
            }
            return resultado;
        } catch (error) {
            throw error
        }
        finally {
            this.desconectar()
        }
    }
    insertFranja = async (body) => {
        let resultado = 0
        this.conectar()
        try {
            const task = new models.AulaFranja(body)
            await task.save()
            resultado = 1
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
        return resultado
    }
    updateFranja = async (id, body) => {
        try {
            let resultado = 0
            this.conectar();
            let task = await models.AulaFranja.findByPk(id);
            await task.update(body)
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
    deleteFranja = async (id) => {
        try {
            this.conectar();
            let resultado = await models.AulaFranja.findByPk(id);
            if (!resultado) {
                throw error;
            }
            await resultado.destroy();
            return resultado;
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
}

module.exports = ConexionAulaFranja;