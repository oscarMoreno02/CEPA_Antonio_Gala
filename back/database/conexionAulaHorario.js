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
           
        }).catch((error) => {
           
        })
    }
    desconectar = () => {
        process.on('SIGINT', () => conn.close())
    }

    getAllHorarios = async () => {
        try {
            let resultado = []
            this.conectar()
            resultado = await models.AulaHorario.findAll({
                include: [{
                    model: models.AulaFranja,
                    as: 'franja',
                },
                {
                    model: models.AulaEspecial,
                    as: 'aula',
                }
                ],
            })
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }

    //Óscar
    getAllHorariosOfAula = async (id) => {
        try {
            let resultado = []
            this.conectar()
            resultado = await models.AulaHorario.findAll({
                where: { idAula: id },
                include: [{
                    model: models.AulaFranja,
                    as: 'franja',
                },
                {
                    model: models.AulaEspecial,
                    as: 'aula',
                }
                ],
                order: [
                    [{ model: models.AulaFranja, as: 'franja' }, 'orden', 'ASC']
                ]
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
    
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
    //Óscar
    getReservaByIdAulaOfDay = async (id, day, month, year) => {
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
            const idHorarios = horarios.map(horario => horario.id);
            const reservas = await models.AulaReserva.findAll({
                where: {
                    idHorario: idHorarios,
                    fecha: fecha
                }
            });
            for (const horario of horarios) {
                const reservasDelHorario = reservas.filter(reserva => reserva.idHorario == horario.id);
                horario.dataValues.reservado = reservasDelHorario.length > 0 ? reservasDelHorario[0] : null;
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