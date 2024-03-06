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
         
        }).catch((error) => {
          
        });
    }

    desconectar() {
        process.on('SIGINT', () => {
            this.db.close()
                .then(() => {
                    process.exit(0);
                })
                .catch((error) => {
            
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
        } finally {
            this.desconectar();
        }
        return resultado;
    }
}

module.exports = ConexionAsistencia;
