'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MensajeChat extends Model {
    static associate(models) {
      this.hasMany(models.Chat, {
        foreignKey: 'idChat',
        as: 'chat'
      });
      this.hasMany(models.user, {
        foreignKey: 'idUsuario',
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
    tableName: 'mensajesChat'
  });

  return MensajeChat;
};
