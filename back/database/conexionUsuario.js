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
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
    }
    desconectar = () => {
        process.on('SIGINT', () => conn.close())
    }

    UsuariosGet = async () => {
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

    UsuarioGet = async (id) => {
        try{
            let resultado = [];
            this.conectar();
            resultado = await models.Categoria.findByPk(id);
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

    UsuariosPost = async (body) => {
        let resultado = 0;
        this.conectar();
        try {
            const password = await bcrypt.hash(body.password, 10);
            const usuarioNuevo = new models.user(body);
            usuarioNuevo.password = password
            await usuarioNuevo.save();
            resultado = usuarioNuevo.id; 
            console.log(resultado)
            return resultado
        } catch (error) {
            if (error instanceof Sequelize.UniqueConstraintError) {
                console.log(`El id ${body.id} ya existe en la base de datos.`);
            } else {
                console.log('Ocurrió un error desconocido: ', error);
            }
            throw error;
        } finally {
            this.desconectar();
        }

     
    }

    UsuariosDelete = async (id) => {
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
    UsuariosPut = async (id,body) => {
        try{
            let resultado = 0
            this.conectar();
            let task = await models.user.findByPk(id);
            await task.update(body)
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
            console.log(err)
            this.desconectar()
        }
    }
}

module.exports = ConexionUser;