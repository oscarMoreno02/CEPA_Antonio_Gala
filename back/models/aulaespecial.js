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
        foreignKey: 'idAula',
        as: 'horariosAula'
      })
    }
    static associate(models) {
      this.hasMany(models.user, {
        foreignKey: 'idProfesor',
        as: 'profesoresAula'
      })
    }
    static associate(models) {
      this.hasMany(models.AulaReserva, {
        foreignKey: 'idAula',
        as: 'reservasAula'
      })
    }
  }
  AulaEspecial.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AulaEspecial',
    tableName: 'aulaespecials'
  });
  return AulaEspecial;
};