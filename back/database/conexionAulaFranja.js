//Jaime

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
           
        }).catch((error) => {
           
        })
    }
    desconectar = () => {
        process.on('SIGINT', () => conn.close())
    }

    getAllFranjas = async () => {
        try {
            let resultado = []
            this.conectar()
            resultado = await models.AulaFranja.findAll({
                order: [
                  ['orden', 'ASC'] 
                ]
              });
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
    //Se que esta mal hecho pero no me da tiempo a ponerlo mejor 
    insertFranja = async (body) => {
        let resultado = 0
        this.conectar()
        try {
            let ultimo = parseInt(await models.AulaFranja.max('orden'));
            ultimo += 1;
            body.orden=ultimo
            const task = new models.AulaFranja(body)
            await task.save()
            resultado=task.id
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

    sortFranjas = async (body) => {
        try {
            let resultado = 0
            this.conectar();

            for (let i=0;i<body.length;i++){
                let aux=i+1
                body[i].orden=aux
                let task = await models.AulaFranja.findByPk(body[i].id);
                await task.update(body[i])
            }
            return resultado
        } catch (error) {
        
            throw error
        } finally {
            this.desconectar()
        }
    }
}

module.exports = ConexionAulaFranja;