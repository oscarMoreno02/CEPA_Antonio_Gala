'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
   
    static associate(models) {
      this.hasMany(models.Noticia, {
        foreignKey: 'idCategoria',
        as: 'noticias'
      });
      this.belongsTo(models.Categoria, {
        foreignKey: 'dependiente',
        as: 'categoriaPrincipal'
      });
      this.hasMany(models.Categoria, {
        foreignKey: 'dependiente',
        as: 'subcategorias'
      });
    }
  }
  Categoria.init({
    nombre: DataTypes.STRING,
    dependiente: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName:'categorias'
  });
  return Categoria;
};