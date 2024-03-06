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

class ConexionUser{
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

    getUsuarios = async () => {
        try{
            let resultado = [];
            this.conectar();
            resultado = await models.user.findAll();
            return resultado;
        }catch(error){
          throw error
        }finally{
            this.desconectar();
        }
    }

    getUsuario = async (id) => {
        try{
            let resultado = [];
            this.conectar();
            resultado = await models.user.findByPk(id);
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

    postUsuarios = async (body) => {
        let resultado;
        this.conectar();
        try {
            const password = await bcrypt.hash(body.password, 10);
            const usuarioNuevo = new models.user(body);
            usuarioNuevo.password = password
            await usuarioNuevo.save();
            resultado = usuarioNuevo.id; 
            return resultado
        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
            } else {
            }
            throw error;
        } finally {
            this.desconectar();
        }

     
    }

    deleteUsuarios = async (id) => {
        try{
            this.conectar();
            let resultado = await models.user.findByPk(id);
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
    putUsuarios = async (id,body) => {
        let resultado = 0
        this.conectar();
        try{
            const task = await models.user.findByPk(id);
            resultado = await task.update(body)
            return resultado
        }catch(error){
            throw error
        }finally{
            this.desconectar()
        }
    }
    //Óscar
    checkLogin = async (email) => {

        this.conectar();
        let user = await models.user.findOne(({
            where: {
                email
            }
        }));

        this.desconectar();
        if (!user) {
            throw new Error('Email no registrado');
        }

        return user;
    }
        //Óscar
    getRolUserId = async (idU) => {
        try {

            let resultado = [];
            this.conectar();
            resultado = await models.user.findOne({
                attributes: ['id','nombre','email','createdAt','updatedAt'],
                where: {
                    id: {
                        [Op.eq]: idU
                    }
                },
                include: [{
                    model: models.rolAsignado,
                    as: 'rolesAsignados',
                    include: [{
                            model: models.rol,
                            as: 'rol',
                            attributes: ['nombre'],
                        },

                    ],
                    attributes: ['id'],
                }, ],
            });
            this.desconectar();
            return resultado;
        } catch (err) {
            this.desconectar()
        }
    }
}

module.exports = ConexionUser;