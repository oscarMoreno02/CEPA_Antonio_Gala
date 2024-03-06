//Jaime

require('dotenv').config()
const bcrypt = require('bcrypt')
const {
    Sequelize,
    sequelize,
    Op,
    where
} = require('sequelize');
const models = require('../models/index.js')

class ConexionAulaReserva {
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

    getAllReservas = async () => {
        try {
            let resultado = []
            this.conectar()
            resultado = await models.AulaReserva.findAll()
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
    getReservaById = async (id) => {
        try {
            let resultado = [];
            this.conectar();
            resultado = await models.AulaReserva.findByPk(id)
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
    insertReserva = async (body) => {
        let resultado = 0
        this.conectar()
        try {
            const task = new models.AulaReserva(body)
            await task.save()
            resultado = 1
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
        return resultado
    }
    updateReserva = async (id, body) => {
        try {
            let resultado = 0
            this.conectar();
            let task = await models.AulaReserva.findByPk(id);
            await task.update(body)
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
    deleteReserva = async (id) => {
        try {
            this.conectar();
            let resultado = await models.AulaReserva.findByPk(id);
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
    //Óscar
    getAllReservasOfAulaWithData = async (id) => {
        try {
            let resultado = []
            this.conectar()
            resultado = await models.AulaReserva.findAll({
                include: [
                    {
                        model: models.AulaEspecial,
                        as: 'aula',
                    },
                    {
                        model: models.AulaHorario,
                        as: 'horario',
                        include:[{
                            model:models.AulaFranja,
                            as:'franja'
                        }]
                    },
                    {
                        model: models.user,
                        as: 'profesor',
                        attributes:['id','nombre','email']
                    }
                ],
                where: {
                    idAula: id
                },
                order:[['fecha','DESC']]
            }
            )
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
    //Óscar
    getReservaWithDataByID = async (id) => {
        try {
            let resultado = []
            this.conectar()
            resultado = await models.AulaReserva.findByPk(id,{
                include: [
                    {
                        model: models.AulaEspecial,
                        as: 'aula',
                    },
                    {
                        model: models.AulaHorario,
                        as: 'horario',
                        include:[{
                            model:models.AulaFranja,
                            as:'franja'
                        }]
                    },
                    {
                        model: models.user,
                        as: 'profesor',
                        attributes:['id','nombre','email']
                    }
                ],
                
                order:[['fecha','DESC']]
            }
            )
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
    //Óscar
    getAllReservasOfProfesorWithData = async (id) => {
        try {
            let resultado = []
            this.conectar()
            resultado = await models.AulaReserva.findAll({
                include: [
                    {
                        model: models.AulaEspecial,
                        as: 'aula',
                    },
                    {
                        model: models.AulaHorario,
                        as: 'horario',
                        include:[{
                            model:models.AulaFranja,
                            as:'franja'
                        }]
                    },
                    {
                        model: models.user,
                        as: 'profesor',
                        attributes:['id','nombre','email']
                    }
                ],
                where: {
                    idProfesor: id
                },
                order:[['fecha','DESC']]
            }
            )
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
        //Óscar
    getAllReservasWithData = async () => {
        try {
            let resultado = []
            this.conectar()
            resultado = await models.AulaReserva.findAll({
                include: [
                    {
                        model: models.AulaEspecial,
                        as: 'aula',
                    },
                    {
                        model: models.AulaHorario,
                        as: 'horario',
                        include:[{
                            model:models.AulaFranja,
                            as:'franja'
                        }]
                    },
                    {
                        model: models.user,
                        as: 'profesor',
                        attributes:['id','nombre','email']
                    }
                ],
        
                order:[['fecha','DESC']]
            }
            )
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
}

module.exports = ConexionAulaReserva