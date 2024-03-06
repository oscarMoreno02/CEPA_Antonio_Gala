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

class ConexionAulaEspecial {
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

    getAllAulas = async () => {
        try {
            let resultado = []
            this.conectar()
            resultado = await models.AulaEspecial.findAll()
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }

    getAulaById = async (id) => {
        try {
            let resultado = [];
            this.conectar();
            resultado = await models.AulaEspecial.findByPk(id)
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

    getAulaByNombre = async (n) => {
        try {
            let resultado = []
            this.conectar()
            resultado = await models.AulaEspecial.findOne({where: { nombre: n }})
            if (!resultado) {
           
                throw new Error('error')
            }
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }

    //Óscar
    getAulaByIdWithData = async (id) => {
        try {
            let resultado = [];
            this.conectar();
            resultado = await models.AulaEspecial.findByPk(id,
                {
                    include: [{
                        model: models.AulaHorario,
                        as: 'horarios',
                        include: [{
                            model: models.AulaFranja,
                            as: 'franja',
                        }, ]
                    }, ],
                }
                )
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

    insertAula = async (body) => {
        let resultado = 0
        this.conectar()
        try {
            const task = new models.AulaEspecial(body)
            await task.save()
            resultado =task.id
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
        return resultado
    }

    updateAula = async (id, body) => {
        try {
            let resultado = 0
            this.conectar();
            let task = await models.AulaEspecial.findByPk(id);
            await task.update(body)
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
    
    deleteAula = async (id) => {
        try {
            this.conectar();
            let resultado = await models.AulaEspecial.findByPk(id);
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

module.exports = ConexionAulaEspecial