const {response,request} = require('express');
const ConexionCategorias = require('../database/conexionCategorias');

   const categoriaExiste = (idCategoria) => {
      return new Promise((resolve, reject) => {
        const conx = new ConexionCategorias();
        console.log('llega')
        conx.getCategoriaById(idCategoria)
        .then(msg => {
          console.log(msg)
          resolve(true)
        })
        .catch(err => {
          console.log('llega3')
          reject(new Error('La categoria asociada no existe'));
        });
      });
    
  }
 
module.exports = {
 categoriaExiste,

}

