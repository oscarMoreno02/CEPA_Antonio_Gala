require('dotenv').config()
const bcrypt = require('bcrypt');
const {
    Sequelize,
    sequelize,
    Op,
    where
} = require('sequelize');
const models = require('../models/index.js');

class ConexionNoticias {
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
        process.on('SIGINT', () => this.close())
    }

    getAllNoticias = async () => {
        try {
            let resultado = [];
            this.conectar();
            resultado = await models.Noticia.findAll({order:[['createdAt','DESC']]});
            return resultado;
        } catch (error) {
            throw error
        } finally {
            this.desconectar();
        }
    }
    getNoticiaById = async (id) => {
        try {
            let resultado = [];
            this.conectar();
            resultado = await models.Noticia.findByPk(id);
            if (!resultado) {
                throw new Error('error');
            }
            return resultado;
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
    getAllNoticiasByCategoria = async (n) => {
        try {
            let resultado = [];
            this.conectar();
            resultado = await models.Noticia.findAll({
                    where: {
                        idCategoria: n
                    },
                    include: [{
                        model: models.Seccion,
                        as: 'secciones',
                        include: [{
                            model: models.Enlace,
                            as: 'enlaces',
                        }, ]
                    }, ],
                }

            );
            if (!resultado) {
                console.log('error')
                throw new Error('error');
            }
            return resultado;
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
    insertNoticia = async (body) => {
        this.conectar();
        try {
            const task = new models.Noticia(body);
            await task.save();
            return task.id;
        } catch (error) {
            console.log(error)
            throw error;
        } finally {
            this.desconectar();
        }
       
    }

    deleteNoticia = async (id) => {
        try {
            this.conectar();
            let resultado = await models.Noticia.findByPk(id);
            if (!resultado) {
                throw error;
            }
            await resultado.destroy();
            return resultado;
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
    updateFullNoticia = async (id, body) => {
        try {
            let resultado = 0
            this.conectar();
            let task = await models.Noticia.findByPk(id);
            await task.update(body)
            return resultado
        } catch (error) {
            throw error
        } finally {
            this.desconectar()
        }
    }
    getNoticiaWithSecciones = async (id) => {
        try {
            let resultado = [];
            this.conectar();
            resultado = await models.Noticia.findByPk(id, {
                include: [{
                    model: models.Seccion,
                    as: 'secciones',
                    include: [{
                        model: models.Enlace,
                        as: 'enlaces',
                    }, ]
                }, ],
            });
            if (resultado == null) {
                throw new Error()
            }
            return resultado;
        } catch (error) {
            throw error
        } finally {
            this.desconectar();
        }
    }
    getAllNoticiasWithSecciones = async () => {
        try {
            let resultado = [];
            this.conectar();
            resultado = await models.Noticia.findAll({
                include: [{
                    model: models.Seccion,
                    as: 'secciones',
                    include: [{
                        model: models.Enlace,
                        as: 'enlaces',
                    }, ],
                }, ],
            });
            if (resultado == null) {
                throw new Error()
            }
            return resultado;
        } catch (error) {
            throw error
        } finally {
            this.desconectar();
        }
    }
}

module.exports = ConexionNoticias;