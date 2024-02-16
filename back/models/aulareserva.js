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
      // define association here
    }
  }
  AulaReserva.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idAula: {
      type: DataTypes.INTEGER,
    },
    idHorario: {
      type: DataTypes.INTEGER,
    },
    idProfesor: {
      type: DataTypes.INTEGER,
    },
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'AulaReserva',
    tableName: 'aulareservas'
  });
  return AulaReserva;
};