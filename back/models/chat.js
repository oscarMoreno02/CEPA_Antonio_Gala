'use strict';/*Laura María Pedraza Gómez* */
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
   
    static associate(models) {
     this.hasMany(models.Eventos, {
        foreignKey: 'id',
        as: 'evento'
      });
    }
    static associate(models){
      this.belongsTo(models.MensajeChat, {
        foreignKey: 'id',
        as: 'mensajesChat'
      });
    }
  }
  Chat.init({
    idEvento: DataTypes.INTEGER,
    activo: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Chat',
    tableName: 'chats'
  });
  return Chat;
};
