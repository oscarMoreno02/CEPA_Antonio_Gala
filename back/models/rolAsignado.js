'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
const rol = require('./rol');
module.exports = (sequelize, DataTypes) => {
  class rolAsignado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  rolAsignado.init({
    idUser: {
      type: DataTypes.INTEGER,
        references: {
          model: user,
          key: 'id'
        }
    },
    idRol: {      
      type: DataTypes.INTEGER,
      references: {
        model: rol,
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'rolAsignado',
  });
  return rolAsignado;
};

