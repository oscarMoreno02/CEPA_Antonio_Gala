'use strict';
/*Laura María Pedraza Gómez* */
const { Sequelize, where } = require('sequelize');
const models = require('../models/index');

class ConexionMensajeChat {

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

    async getMensajesChats() {
        this.conectar();
        let resultado = [];
        try {
            resultado = await models.MensajeChat.findAll();
        } catch (error) {
    
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
        } catch (error) {
           
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
        } catch (error) {
          
        } finally {
            this.desconectar();
        }
        return resultado;
    }
}

module.exports = ConexionMensajeChat;
