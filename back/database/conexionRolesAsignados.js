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
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
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
                console.log(resultado)
                throw new Error('error');
            }
            return resultado;
        }catch(error){
            console.log('llegaCatch')
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
            console.log(error)
            throw error;
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    rolesAsignadosDelete = async (idUser, idRol) => {
        try{
            this.conectar();
            let resultado = await models.rolAsignados.findOne({
                where: {
                    idUser: idUser,
                    idRol: idRol
                }
            });

            await resultado.destroy();
            return resultado;
        }catch(error){
            throw error
        }finally{
            this.desconectar()
        }
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