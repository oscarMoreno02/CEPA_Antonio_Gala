require('dotenv').config()
const bcrypt = require('bcrypt');
const {
    Sequelize,
    sequelize,
    Op,
    where
} = require('sequelize');
const models = require('../models/index.js');

class ConexionCategorias{
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

    getAllCategorias = async () => {
        try{
            let resultado = [];
            this.conectar();
            resultado = await models.Categoria.findAll();
            return resultado;
        }catch(error){
          throw error
        }finally{
            this.desconectar();
        }
    }
    getAllCategoriasAgrupadas = async () => {
        try{
            let resultado = [];
            this.conectar();
            resultado = await models.Categoria.findAll({
                include: [{
                        model: models.Categoria,
                        as: 'subcategorias',
                    },
                ],
            });
            return resultado;
        }catch(error){
          throw error
        }finally{
            this.desconectar();
        }
    }
    getCategoriaAgrupada = async (id) => {
        try{
            let resultado = [];
            this.conectar();
            resultado = await models.Categoria.findByPk(id,{
                where: {
                    dependiente: null
                },
                include: [{
                        model: models.Categoria,
                        as: 'subcategorias',
                    },
                ],
            });
            if(resultado==null){
                throw  new Error()
            }
            return resultado;
        }catch(error){
          throw error
        }finally{
            this.desconectar();
        }
    }
    getCategoriaById = async (id) => {
        try{
            let resultado = [];
            this.conectar();
            resultado = await models.Categoria.findByPk(id);
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
    getCategoriaByNombre= async (n) => {
        try{
            let resultado = [];
            this.conectar();
            console.log(n)
            resultado = await models.Categoria.findOne({where: { nombre: n}});
       
            console.log(resultado)
            if (!resultado) {
                console.log('error')
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


    insertCategoria = async (body) => {
        let resultado = 0;
        this.conectar();
        try {
            const task = new models.Categoria(body);
            await task.save();
            resultado = 1;
        } catch (error) {
            throw error;
        } finally {
            this.desconectar();
        }
        return resultado;
    }

    deleteCategoria = async (id) => {
        try{
            this.conectar();
            let resultado = await models.Categoria.findByPk(id);
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
    updateFullCategoria = async (id,body) => {
        try{
            let resultado = 0
            this.conectar();
            let task = await models.Categoria.findByPk(id);
            await task.update(body)
            return resultado
        }catch(error){
            throw error
        }finally{
            this.desconectar()
        }
    }
   
}

module.exports = ConexionCategorias;