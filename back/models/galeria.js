'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Galeria extends Model {
    static associate(models) {
      this.hasMany(models.Evento, { 
        foreignKey: 'id', 
        as: 'evento'
      });
    }
  }
  Galeria.init({
    idEvento: DataTypes.INTEGER,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Galeria',
    tableName: 'galerias'
  });
  return Galeria;
};
