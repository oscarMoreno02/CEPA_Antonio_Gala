//Raúl

require('dotenv').config()
const bcrypt = require('bcrypt');
const {
    Sequelize,
    sequelize,
    Op,
    where
} = require('sequelize');
const models = require('../models/index.js');

class ConexionRoles{
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

    rolesGet = async () => {
        try{
            let resultado = [];
            this.conectar();
            resultado = await models.rol.findAll();
            return resultado;
        }catch(error){
          throw error
        }finally{
            this.desconectar();
        }
    }

    rolesPost = async (body) => {
        let resultado = 0;
        this.conectar();
        try {
            const task = new models.rol(body);
            await task.save();
            resultado = 1;
        } catch (error) {
            throw error;
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    rolesDelete = async (id) => {
        try{
            this.conectar();
            let resultado = await models.rol.findByPk(id);
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
    rolesPut = async (id,body) => {
        try{
            let resultado = 0
            this.conectar();
            let task = await models.rol.findByPk(id);
            await task.update(body)
            return resultado
        }catch(error){
            throw error
        }finally{
            this.desconectar()
        }
    }
   
}

module.exports = ConexionRoles;