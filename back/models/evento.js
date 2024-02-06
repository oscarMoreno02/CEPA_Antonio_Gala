'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
   
    static associate(models) {
      this.hasMany(models.Asistencia, {
        foreignKey: 'idEvento',
        as: 'asistencias'
      });
      this.hasMany(models.Chat, {
        foreignKey: 'idEvento',
        as: 'chat'
      });
    }
  }
  Evento.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fecha: DataTypes.STRING,
    hora: DataTypes.STRING,
    foto: DataTypes.STRING,
    mg: DataTypes.NUMBER,
    visibilidad: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Evento',
    tableName: 'eventos'
  });
  return Evento;
};