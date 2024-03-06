'use strict';
/*Laura María Pedraza Gómez* */
const { Sequelize } = require('sequelize');
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

    async getChats() {
        this.conectar();
        let resultado = [];
        try {
            resultado = await models.Chat.findAll();
        } catch (error) {
      
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    async getChatPorId(id) {
        this.conectar();
        let resultado;
        try {
            resultado = await models.Chat.findByPk(id);
        } catch (error) {
         
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    async postChat(body) {
        this.conectar();
        let resultado;
        try {
            resultado = await models.Chat.create(body);
        } catch (error) {
          
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    async deleteChat(id) {
        this.conectar();
        let resultado;
        try {
            const chat = await models.Chat.findByPk(id);
            if (!chat) {
                throw new Error(`Chat con ID ${id} no encontrado`);
            }
            resultado = await chat.destroy();
        } catch (error) {
           
        } finally {
            this.desconectar();
        }
        return resultado;
    }
}

module.exports = ConexionChat;
