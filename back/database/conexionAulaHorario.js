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

class ConexionAulaHorario {
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

    getAllHorarios = async () => {
        try {
            let resultado = []
            this.conectar()
            resultado = await models.AulaHorario.findAll()
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
    
    //Oscar
    getAllHorariosOfAula = async (id) => {
        try {
            let resultado = []
            this.conectar()
            resultado = await models.AulaHorario.findAll({where:{idAula:id},    
              
                include: [{
                        model: models.AulaFranja,
                        as: 'franja',
                    },
                    {
                        model: models.AulaEspecial,
                        as: 'aula',
                    }
                ],
        

            },
            
            )
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
    getHorarioById = async (id) => {
        try {
            let resultado = [];
            this.conectar();
            resultado = await models.AulaHorario.findByPk(id)
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
    insertHorario = async (body) => {
        let resultado = 0
        this.conectar()
        try {
            const task = new models.AulaHorario(body)
            await task.save()
          return task.id
            console.log(resultado)
            console.log(task)
            return resultado
           
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
    getReservaByIdAulaOfDay = async (id,day,month,year) => {
            try {
                const parsedDay = parseInt(day, 10);
                const parsedMonth = parseInt(month, 10);
                const parsedYear = parseInt(year, 10);
                const fecha = new Date(parsedYear, parsedMonth - 1, parsedDay);
                this.conectar();

                const horarios = await models.AulaHorario.findAll({
                    include: [
                        {
                            model: models.AulaFranja,
                            as: 'franja',
                        }
                    ],
                    where: {
                        idAula: id
                    }
                });
                for(const h of horarios){
                    const reservas = await models.AulaReserva.findAll({
                        where: {
                            idHorario: h.id,
                            fecha: fecha
                        }
                    });
                    if(reservas.length>0){
                        h.dataValues.reservas=reservas
                    }else{
                        h.dataValues.reservas=null
                    }

                }
                return horarios;
            } catch (error) {
                throw error;
            } finally {
                this.desconectar();
            }
        }
    
    updateHorario = async (id, body) => {
        try {
            let resultado = 0
            this.conectar();
            let task = await models.AulaHorario.findByPk(id);
            await task.update(body)
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
    deleteHorario = async (id) => {
        try {
            this.conectar();
            let resultado = await models.AulaHorario.findByPk(id);
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

module.exports = ConexionAulaHorario