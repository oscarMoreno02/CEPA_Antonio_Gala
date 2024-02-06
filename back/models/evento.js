'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    static associate(models) {
      this.hasMany(models.Chat, {
        foreignKey: 'eventoId',
        as: 'chats'
      });
      this.hasMany(models.Asistencia, {
        foreignKey:'eventoId',
        as:'asistencias'
      });
      this.hasMany(models.Galeria, { 
        foreignKey:'eventoId',
        as:'galerias'
      });
    }
  }
  Evento.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fecha: DataTypes.STRING,
    hora: DataTypes.STRING,
    foto: DataTypes.STRING,
    mg: DataTypes.STRING,
    visibilidad: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Evento',
  });
  return Evento;
};