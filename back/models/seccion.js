'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seccion extends Model {
  
    static associate(models) {
      this.belongsTo(models.Noticia, {
        foreignKey: 'idNoticia',
        as: 'noticia'
      });
    }
  }
  Seccion.init({
    idNoticia: DataTypes.NUMBER,
    titulo: DataTypes.STRING,
    texto: DataTypes.TEXT,
    idCategoria: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Seccion',
    tableName:'secciones'
  });
  return Seccion;
};