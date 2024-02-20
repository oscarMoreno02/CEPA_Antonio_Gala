//Jaime
//Oscar (cambiado nombre de tablas)

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AulaHorario extends Model {
 
    //Óscar - Asociaciones
    static associate(models) {
      this.belongsTo(models.AulaEspecial, {
        foreignKey: 'idAula',
        as: 'aula'
      });
      this.belongsTo(models.AulaFranja, {
        foreignKey: 'idFranja',
        as: 'franja'
      });
    }
  }
  AulaHorario.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    idAula: {
      type: DataTypes.INTEGER,
    },
    idFranja: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'AulaHorario',
    tableName: 'aulasHorarios'
  });
  return AulaHorario;
};