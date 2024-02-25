'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    static associate(models) {
      this.hasMany(models.Chat, {
        foreignKey: 'id',
        as: 'chats'
      });
      this.hasMany(models.Asistencia, {
        foreignKey:'id',
        as:'asistencias'
      });
      this.hasMany(models.Galeria, { 
        foreignKey:'id',
        as:'galerias'
      });
    }
  }
  Evento.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    fecha: DataTypes.STRING,
    hora: DataTypes.STRING,
    fotoCartel: DataTypes.STRING,
    mg: DataTypes.INTEGER,
    visibilidad: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Evento',
    tableName: 'eventos'
  });
  return Evento;
};