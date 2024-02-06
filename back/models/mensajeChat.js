'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MensajeChat extends Model {
    static associate(models) {
      this.belongsTo(models.Chat, {
        foreignKey: 'idChat',
        as: 'chat'
      });
      this.belongsTo(models.Usuarios, {
        foreignKey: 'idUsuario',
        as: 'usuario'
      });
    }
  }

  MensajeChat.init({
    idChat: DataTypes.NUMBER,
    idUsuario: DataTypes.NUMBER,
    mensaje: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MensajeChat',
    tableName: 'mensajesChat'
  });

  return MensajeChat;
};
