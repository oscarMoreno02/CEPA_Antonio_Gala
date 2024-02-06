'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AulaHorario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.AulaEspecial, {
        foreignKey: 'idAula',
        as: 'aulaHorario'
      })
    }
    static associate(models) {
      this.belongsTo(models.AulaFranja, {
        foreignKey: 'idFranja',
        as: 'franjaHorario'
      })
    }
    static associate(models) {
      this.belongsTo(models.AulaReserva, {
        foreignKey: 'idHorario',
        as: 'horarioReserva'
      })
    }
  }
  AulaHorario.init({
    idAula: DataTypes.INTEGER,
    idFranja: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AulaHorario',
    tableName: 'aulahorarios'
  });
  return AulaHorario;
};