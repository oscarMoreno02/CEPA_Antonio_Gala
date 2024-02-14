/*
Jaime -> creación del model
Laura -> arreglo de importaciones para la funcionalidad del model
*/

'use strict';
const {
  Model
} = require('sequelize');

const AulaEspecial = require('./aulaespecial'); 
const AulaFranja = require('./aulafranja'); 

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
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    idAula: {
      type: DataTypes.INTEGER,
      references: {
        model: AulaEspecial,
        key: 'id'
      }
    },
    idFranja: {
      type: DataTypes.INTEGER,
      references: {
        model: AulaFranja,
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'AulaHorario',
    tableName: 'aulahorarios'
  });
  return AulaHorario;
};