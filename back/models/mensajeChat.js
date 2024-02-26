'use strict';/*Laura María Pedraza Gómez* */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MensajeChat extends Model {
    static associate(models) {
      this.hasMany(models.Chat, {
        foreignKey: 'id',
        as: 'chat'
      });
      this.hasMany(models.user, {
        foreignKey: 'id',
        as: 'usuario'
      });
    }
  }

  MensajeChat.init({
    idChat: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    mensaje: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MensajeChat',
    tableName: 'mensajesChats'
  });

  return MensajeChat;
};
