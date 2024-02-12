'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    //Óscar
    static associate(models) {
      this.hasMany(models.rolAsignado, {
        foreignKey: 'idUser',
        as: 'rolesAsignados',
      });
    }
  }
  user.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    tableName:'usuarios'
  });
  return user;
};