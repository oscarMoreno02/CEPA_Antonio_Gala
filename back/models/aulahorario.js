//Jaime
//Óscar(cambiado nombre de tablas y asociaciones)
'use strict';
const {
  Model
} = require('sequelize');

const AulaEspecial = require('./aulaespecial'); 
const AulaFranja = require('./aulafranja'); 

module.exports = (sequelize, DataTypes) => {
  class AulaHorario extends Model {
 

    static associate(models) {
      this.belongsTo(models.AulaEspecial, {
        foreignKey: 'idAula',
        as: 'aula'
      });
      this.belongsTo(models.AulaFranja, {
        foreignKey: 'idFranja',
        as: 'franja'
      });
      this.hasMany(models.AulaReserva, {
        foreignKey: 'idHorario',
        as: 'reservas'
      });
    }
  }
  AulaHorario.init({
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