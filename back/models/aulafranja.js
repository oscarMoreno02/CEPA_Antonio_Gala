//Jaime
//Oscar (cambiado nombre de tablas)

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AulaFranja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AulaFranja.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    turno: DataTypes.STRING,
    horaInicio: DataTypes.TIME(4),
    horaFin: DataTypes.TIME(4)
  }, {
    sequelize,
    modelName: 'AulaFranja',
    tableName: 'aulaFranjas'
  });
  return AulaFranja;
};