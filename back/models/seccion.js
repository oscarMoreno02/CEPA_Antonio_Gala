'use strict';
const {
  Model
} = require('sequelize');
//Óscar
module.exports = (sequelize, DataTypes) => {
  class Seccion extends Model {
  
    static associate(models) {
      this.belongsTo(models.Noticia, {
        foreignKey: 'idNoticia',
        as: 'noticia'
      });
    }
    static associate(models) {
      this.hasMany(models.Enlace, {
        foreignKey: 'idSeccion',
        as: 'enlaces'
      });
    }
  }
  Seccion.init({
    idNoticia: DataTypes.NUMBER,
    titulo: DataTypes.STRING,
    texto: DataTypes.TEXT,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Seccion',
    tableName:'secciones'
  });
  return Seccion;
};