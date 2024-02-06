'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Asistencia extends Model {
    static associate(models) {
      this.belongsTo(models.Eventos, {
        foreignKey: 'idEvento',
        as: 'evento'
      });
      this.belongsTo(models.Usuarios, {
        foreignKey: 'idUsuario',
        as: 'usuario'
      });
    }
  }

  Asistencia.init({
    idEvento: DataTypes.NUMBER,
    idUsuario: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Asistencia',
    tableName: 'asistencias'
  });

  return Asistencia;
};