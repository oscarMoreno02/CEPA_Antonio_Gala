'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Asistencia extends Model {
    static associate(models) {
      this.belongsTo(models.Evento, {
        foreignKey: 'idEvento',
        as: 'evento'
      });
      this.belongsTo(models.user, {
        foreignKey: 'idUsuario',
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