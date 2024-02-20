//Jaime
//Oscar (cambiado nombre de tablas)

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
       //Óscar - Asociaciones
    static associate(models) {
      this.hasMany(models.AulaHorario, {
        foreignKey: 'idAula',
        as: 'horarios'
      });
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
    tableName: 'aulasEspeciales'
  });
  return AulaEspecial;
};