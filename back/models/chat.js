'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chats extends Model {
   
    static associate(models) {
      this.belongsTo(models.Eventos, {
        foreignKey: 'idEvento',
        as: 'evento'
      });
      this.hasMany(models.MensajeChat, {
        foreignKey: 'idChat',
        as: 'mensajesChat'
      });
    }
  }
  Chats.init({
    idEvento: DataTypes.INTEGER,
    activo: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Chats',
    tableName: 'chats'
  });
  return Chats;
};
