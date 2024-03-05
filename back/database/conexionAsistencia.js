'use strict';
/*Laura María Pedraza Gómez* */
const { Sequelize } = require('sequelize');
const models = require('../models/index');

class ConexionAsistencia {

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
        });
        this.conectar();
    }

    conectar() {
        this.db.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
    }

    desconectar() {
        process.on('SIGINT', () => {
            this.db.close()
                .then(() => {
                    console.log('Connection has been closed successfully.');
                    process.exit(0);
                })
                .catch((error) => {
                    console.error('Error closing the database connection: ', error);
                    process.exit(1);
                });
        });
    }

    async getAsistencias() {
        this.conectar();
        let resultado = [];
        try {
            resultado = await models.Asistencia.findAll();
        } catch (error) {
            console.error('Error al obtener asistencias: ', error);
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    async getAsistenciaPorId(id) {
        this.conectar();
        let resultado;
        try {
            resultado = await models.Asistencia.findByPk(id);
        } catch (error) {
            console.error(`Error al obtener asistencia con ID ${id}: `, error);
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    async postAsistencia(body) {
        this.conectar();
        let resultado;
        try {
            resultado = await models.Asistencia.create(body);
        } catch (error) {
            console.error('Error al crear asistencia: ', error);
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    async getAsistenciasUsuario(userId){
        this.conectar();
        let usuarios = [];
        try {
            usuarios = await models.Asistencia.findAll({
                where: {
                    idUsuario: userId
                  },
                  include: [{
                      model:models.Evento,
                      as:'evento'
                  }]
            });
        } catch (error){
            console.error('Error al obtener las asistencias: ', error);
        } finally {
            this.desconectar();
        }
        return usuarios;
    }

    async getUsuariosEvento(eventoId){
        this.conectar();
        let resultado;
        try {
            resultado = await models.Asistencia.findAll({
                where: {
                  idEvento: eventoId
                },
                include: [{
                    model:models.user,
                    as:'usuario'
                }]
              });
        } catch (error){
            console.error('Error al obtener los usuarios: ', error);
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    async getAsistenciaEventoUsuario(eventoId, usuarioId){
        this.conectar();
        let resultado;
        try {
            resultado = await models.Asistencia.findAll({
                where: {
                    idEvento: eventoId,
                    idUsuario: usuarioId
                }
            })
        } catch (error){
            console.error('Error al obtener los usuarios: ', error);
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    async deleteAsistencia(id) {
        this.conectar();
        let resultado;
        try {
            const asistencia = await models.Asistencia.findByPk(id);
            if (!asistencia) {
                throw new Error(`Asistencia con ID ${id} no encontrado`);
            }
            resultado = await asistencia.destroy();
        } catch (error) {
            console.error(`Error al eliminar asistencia con ID ${id}: `, error);
        } finally {
            this.desconectar();
        }
        return resultado;
    }
}

module.exports = ConexionAsistencia;
