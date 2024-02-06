'use strict';

const { Sequelize, where } = require('sequelize');
const models = require('../models/index');

class ConexionChat {

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

    async getMensajesChats() {
        this.conectar();
        let resultado = [];
        try {
            resultado = await models.MensajeChat.findAll();
        } catch (error) {
            console.error('Error al obtener los mensajes: ', error);
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    async getMensajeChatPorId(id) {
        this.conectar();
        let resultado;
        try {
            resultado = await models.MensajeChat.findByPk(id);
        } catch (error) {
            console.error(`Error al obtener el mensaje de un chat con ID ${id}: `, error);
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    async postMensajeChat(body) {
        this.conectar();
        let resultado;
        try {
            resultado = await models.MensajeChat.create(body);
        } catch (error) {
            console.error('Error al crear el mensaje: ', error);
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    async getMensajesChat(chatId) {
        this.conectar();
        let resultado;
    
        try {
            const mensajes = await models.mensajesChat.findAll({
                where: {
                    idChat: chatId
                }
            });
            if (!mensajes) {
                throw new Error('Chat no encontrado');
            }
            resultado = mensajes;
            console.log(`Mensajes encontrados correctamente: ${mensajes}`);
        } catch (error) {
            console.error('Error al obtener mensajes de chat:', error.message);
            throw error;
        } finally {
            this.desconectar();
        }
        return resultado;
    }    

    async deleteMensajeChat(id) {
        this.conectar();
        let resultado;
        try {
            const chat = await models.MensajeChat.findByPk(id);
            if (!chat) {
                throw new Error(`Mensaje con ID ${id} no encontrado`);
            }
            resultado = await chat.destroy();
            console.log('Mensaje eliminado correctamente');
        } catch (error) {
            console.error(`Error al eliminar mensaje con ID ${id}: `, error);
        } finally {
            this.desconectar();
        }
        return resultado;
    }
}

module.exports = ConexionChat;
