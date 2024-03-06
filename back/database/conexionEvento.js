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
     
        }).catch((error) => {
           
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
            
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    getEventosActivos = async () => {
        this.conectar();
        let resultado = [];
        try {
            resultado = await models.Evento.findAll({
                where: {
                    visibilidad: true
                }
            });
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

        } finally {
            this.desconectar();
        }
        return resultado;
    }

    postEvento = async (body) => {
        this.conectar();
        let resultado;
        try {
            const evento =  new models.Evento(body);
            await evento.save()
            resultado=evento.id
            return resultado;
        } catch (error) {
         
        } finally {
            this.desconectar();
        }
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
           
        } finally {
            this.desconectar();
        }
        return resultado;
    }
    
    getNumAsistentesEvento = async  (id) => {
        this.conectar();
        let resultado;
        try {
            const evento = await models.Evento.findByPk(id); 
            resultado = evento.numAsistentes
        } catch (error) {
    
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    deleteAsistenteEvento = async (id) => {
        this.conectar()
        let resultado
        try {
            const evento = await models.Evento.findByPk(id)
            evento.numAsistentes = evento.numAsistentes - 1
            resultado = await evento.save()
        } catch (error) {

        } finally {
            this.desconectar();
        }
        return resultado;
    }

    putAsistenteEvento = async (id) => {
        this.conectar()
        let resultado
        try {
            const evento = await models.Evento.findByPk(id)
            evento.numAsistentes = evento.numAsistentes + 1
            resultado = await evento.save()
        } catch (error) {
      
        } finally {
            this.desconectar();
        }
        return resultado;
    }
}

module.exports = ConexionEvento;
