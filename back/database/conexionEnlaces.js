require('dotenv').config()
const bcrypt = require('bcrypt');
const {
    Sequelize,
    sequelize,
    Op,
    where
} = require('sequelize');
const models = require('../models/index.js');
//Óscar
class ConexionEnlaces{
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
        process.on('SIGINT', () => conn.close())
    }

    getAllEnlaces = async () => {
        try{
            let resultado = [];
            this.conectar();
            resultado = await models.Enlace.findAll();
            return resultado;
        }catch(error){
          throw error
        }finally{
            this.desconectar();
        }
    }
    getEnlaceById = async (id) => {
        try{
            let resultado = [];
            this.conectar();
            resultado = await models.Enlace.findByPk(id);
            if (!resultado) {
                throw new Error('error');
            }
            return resultado;
        }catch(error){
            throw error
        }
        finally{
            this.desconectar()
        }
    }
    getEnlaceBySeccion= async (n) => {
        try{
            let resultado = [];
            this.conectar();
            resultado = await models.Enlace.findAll({where: { idSeccion: n}});
            if (!resultado) {
         
                throw new Error('error');
            }
            return resultado;
        }catch(error){
            throw error
        }
        finally{
            this.desconectar()
        }
    }
    insertEnlace = async (body) => {

        this.conectar();
        try {
            const enlace = new models.Enlace(body);
            await enlace.save();
           return enlace.id
        } catch (error) {
            throw error;
        } finally {
            this.desconectar();
        }
        
    }

    deleteEnlace = async (id) => {
        try{
            this.conectar();
            let resultado = await models.Enlace.findByPk(id);
            if (!resultado) {
                throw error;
            }
            await resultado.destroy();
            return resultado;
        }catch(error){
            throw error
        }finally{
            this.desconectar()
        }
    }
    updateFullEnlace= async (id,body) => {
        try{
            let resultado = 0
            this.conectar();
            let enlace = await models.Enlace.findByPk(id);
            await enlace.update(body)
            return resultado
        }catch(error){
            throw error
        }finally{
            this.desconectar()
        }
    }
   
}

module.exports = ConexionEnlaces;