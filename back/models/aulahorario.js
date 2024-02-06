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
      // define association here
    }
  }
  AulaHorario.init({
    idAula: DataTypes.INTEGER,
    idFranja: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AulaHorario',
  });
  return AulaHorario;
};