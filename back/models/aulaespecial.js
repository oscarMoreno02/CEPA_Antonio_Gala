'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AulaEspecial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.AulaHorario, {
        foreignKey: 'idHorario',
        as: 'horariosAula',
      })
      this.hasMany(models.AulaReserva, {
        foreignKey: 'idReserva',
        as: 'reservasAula',
      })
    }
  }
  AulaEspecial.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AulaEspecial',
    tableName: 'aulaespecials'
  });
  return AulaEspecial;
};