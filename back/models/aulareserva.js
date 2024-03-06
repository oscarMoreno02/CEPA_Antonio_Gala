//Jaime
//Óscar (cambiado nombre de tablas y asociaciones)

'use strict';
const {
  Model
} = require('sequelize');

const AulaEspecial = require('./aulaespecial');
const AulaHorario = require('./aulahorario');
const user = require('./user');

module.exports = (sequelize, DataTypes) => {
  class AulaReserva extends Model {
    static associate(models) {
      this.belongsTo(models.AulaHorario, {
        foreignKey: 'idHorario',
        as: 'horario'
      });
      this.belongsTo(models.AulaEspecial, {
        foreignKey: 'idAula',
        as: 'aula'
      });
      this.belongsTo(models.user, {
        foreignKey: 'idProfesor',
        as: 'profesor'
      });
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
    fecha: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'AulaReserva',
    tableName: 'aulasReservas'
  });
  return AulaReserva;
};