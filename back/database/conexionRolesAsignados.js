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

class ConexionRolesAsignados{
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

    rolesAsignadosGet = async () => {
        try{
            let resultado = [];
            this.conectar();
            resultado = await models.rolAsignados.findAll();
            return resultado;
        }catch(error){
          throw error
        }finally{
            this.desconectar();
        }
    }

    rolesAsignadosGetId = async (idUser) => {
        try{
            let resultado = [];
            this.conectar();
            resultado = await models.rolAsignado.findAll({
                where: {
                    idUser : idUser
                }
            });
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

    rolesAsignadosPost = async (body) => {
        let resultado;
        this.conectar();
        try {
            const rolAsig = new models.rolAsignado(body);
            await rolAsig.save();
        } catch (error) {
            throw error;
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    rolesAsignadosDelete = async (id) => {
        try{
            this.conectar();
            let resultado = await models.rolAsignados.findByPk(id);
            await resultado.destroy();
        }catch(error){
            throw error
        }finally{
            this.desconectar()
        }
        return resultado;
    }
    rolesAsignadosPut = async (id,body) => {
        try{
            let resultado = 0
            this.conectar();
            let task = await models.rolAsignados.findByPk(id);
            await task.update(body)
            return resultado
        }catch(error){
            throw error
        }finally{
            this.desconectar()
        }
    }
   
}

module.exports = ConexionRolesAsignados;