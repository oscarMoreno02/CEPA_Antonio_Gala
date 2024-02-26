'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  //Óscar
  class Noticia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Categoria, {
        foreignKey: 'idCategoria',
        as: 'categoria'
      });
      this.hasMany(models.Seccion, {
        foreignKey: 'idNoticia',
        as: 'secciones'
      });
    }
  }
  Noticia.init({
    titulo: DataTypes.STRING,
    enlace: DataTypes.STRING,
    idCategoria: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Noticia',
    tableName: 'noticias'
  });
  return Noticia;
};