'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enlace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Seccion, {
        foreignKey: 'idSeccion',
        as: 'seccion'
      });
    }
  }
  Enlace.init({
    idSeccion: DataTypes.NUMBER,
    textoClave: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Enlace',
    tableName:'enlaces'
  });
  return Enlace;
};