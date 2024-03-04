'use strict';
/*Laura María Pedraza Gómez* */
const { Sequelize } = require('sequelize');
const models = require('../models/index');

class ConexionEvento {

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
    }

    conectar = () => {
        this.db.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
    }

    desconectar = () => {
        process.on('SIGINT', () => this.db.close());
    }

    getEventos = async () => {
        this.conectar();
        let resultado = [];
        try {
            resultado = await models.Evento.findAll();
        } catch (error) {
            console.error('Error al obtener eventos: ', error);
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    getEventoPorId = async (id) => {
        this.conectar();
        let resultado;
        try {
            resultado = await models.Evento.findByPk(id);
        } catch (error) {
            console.error(`Error al obtener evento con ID ${id}: `, error);
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    postEvento = async (body) => {
        this.conectar();
        let resultado;
        try {
            resultado = await models.Evento.create(body);
        } catch (error) {
            console.error('Error al crear evento: ', error);
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    updateEvento = async (id, body) => {
        this.conectar();
        let resultado;
        try {
            const evento = await models.Evento.findByPk(id);
            if (!evento) {
                throw new Error(`Evento con ID ${id} no encontrado`);
            }
            resultado = await evento.update(body);
        } catch (error) {
            console.error(`Error al actualizar evento con ID ${id}: `, error);
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    deleteEvento = async (id) => {
        this.conectar();
        let resultado;
        try {
            const evento = await models.Evento.findByPk(id);
            if (!evento) {
                throw new Error(`Evento con ID ${id} no encontrado`);
            }
            resultado = await evento.destroy();
        } catch (error) {
            console.error(`Error al eliminar evento con ID ${id}: `, error);
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    plusMgEvento = async (id) => {
        this.conectar();
        let resultado;
        try {
            const evento = await models.Evento.findByPk(id);
            if (!evento) {
                throw new Error(`Evento con ID ${id} no encontrado`);
            } else {
                evento.mg = evento.mg + 1;
                resultado = await evento.save();
            }
        } catch (error) {
            console.error(`Error al actualizar evento con ID ${id}: `, error);
        } finally {
            this.desconectar();
        }
        return resultado;
    }    
}

module.exports = ConexionEvento;
