'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AulaReserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.AulaEspecial, {
        foreignKey: 'idAula',
        as: 'aulaReserva'
      })
    }
    static associate(models) {
      this.belongsTo(models.AulaHorario, {
        foreignKey: 'idHorario',
        as: 'horarioReserva'
      })
    }
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: 'idProfesor',
        as: 'profesorReserva'
      })
    }
  }
  AulaReserva.init({
    idAula: DataTypes.INTEGER,
    idHorario: DataTypes.INTEGER,
    idProfesor: DataTypes.INTEGER,
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'AulaReserva',
    tableName: 'aulareservas'
  });
  return AulaReserva;
};