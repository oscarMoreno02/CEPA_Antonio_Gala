'use strict';
/*Laura María Pedraza Gómez* */
const { Sequelize, where } = require('sequelize');
const models = require('../models/index');

class ConexionGaleria {

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

    async getGalerias() {
        this.conectar();
        let resultado = [];
        try {
            resultado = await models.Galeria.findAll();
        } catch (error) {
            
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    async getGaleriaPorId(id) {
        this.conectar();
        let resultado;
        try {
            resultado = await models.Galeria.findByPk(id);
        } catch (error) {
            
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    async postGaleria(body) {
        this.conectar();
        let resultado;
        try {
            resultado = await models.Galeria.create(body);
        } catch (error) {
          
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    async deleteGaleria(id) {
        this.conectar();
        let resultado;
        try {
            const galeria = await models.Galeria.findByPk(id);
            if (!galeria) {
                throw new Error(`Galeria con ID ${id} no encontrado`);
            }
            resultado = await galeria.destroy();
        } catch (error) {
      
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    async getGaleriaEvento(id){
        this.conectar()
        let galeria = []
        try {
            galeria = await models.Galeria.findAll({
                where: {
                    idEvento: id
                }
            })
        } catch (error){
         
        } finally {
            this.desconectar()
        }
        return galeria
    }
}

module.exports = ConexionGaleria;