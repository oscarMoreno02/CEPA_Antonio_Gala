const {response,request} = require('express');
const ConexionCategorias = require('../database/conexionCategorias');
//Óscar
   const categoriaExiste = (idCategoria) => {
      return new Promise((resolve, reject) => {
        const conx = new ConexionCategorias();
        conx.getCategoriaById(idCategoria)
        .then(msg => {
          resolve(true)
        })
        .catch(err => {
          reject(new Error('La categoria asociada no existe'));
        });
      });
    
  }
 
module.exports = {
 categoriaExiste,

}

