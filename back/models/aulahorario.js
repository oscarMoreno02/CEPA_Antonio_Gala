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
      this.hasMany(models.AulaEspecial, {
        foreignKey: 'idAula',
        as: 'aulasHorario',
      })
      this.hasMany(models.AulaFranja, {
        foreignKey: 'idFranja',
        as: 'franjasHorario',
      })
    }
  }
  AulaHorario.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    idAula: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: AulaEspecial,
      //   key: 'id'
      // }
    },
    idFranja: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: AulaFranja,
      //   key: 'id'
      // }
    }
  }, {
    sequelize,
    modelName: 'AulaHorario',
    tableName: 'aulahorarios'
  });
  return AulaHorario;
};