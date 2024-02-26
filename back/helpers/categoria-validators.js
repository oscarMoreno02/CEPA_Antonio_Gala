const {response,request} = require('express');
const Conexion = require('../database/conexionCategorias');
//Óscar
const nombreExiste = (nombre) => {
    return new Promise((resolve, reject) => {
      const conx = new Conexion();
      conx.getCategoriaByNombre(nombre)
      .then(msg => {
        reject(new Error('Nombre en uso'));
      })
      .catch(err => {
          resolve(true);
        });
    });
   };
   const dependienteExiste = (dependiente) => {
    let correcto=true
    if (dependiente!=null){
      return new Promise((resolve, reject) => {
        const conx = new Conexion();
        conx.getCategoriaById(dependiente)
        .then(msg => {
          resolve(true)
        })
        .catch(err => {
          reject(new Error('Categoria dependiente no existe'));
        });
      });
    }else{

      return true
    }
  }
 
module.exports = {
 nombreExiste,
 dependienteExiste
}

