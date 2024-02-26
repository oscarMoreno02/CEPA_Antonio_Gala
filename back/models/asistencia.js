'use strict';/*Laura María Pedraza Gómez* */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Asistencia extends Model {
    static associate(models) {
      this.belongsTo(models.Evento, {
        foreignKey: 'id',
        as: 'evento'
      });
      this.belongsTo(models.user, {
        foreignKey: 'id',
        as: 'usuario'
      });
    }
  }

  Asistencia.init({
    idEvento: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Asistencia',
    tableName: 'asistencias'
  });

  return Asistencia;
};