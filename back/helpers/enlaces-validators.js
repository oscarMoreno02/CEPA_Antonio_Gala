const {response,request} = require('express');
const ConexionSecciones = require('../database/conexionSecciones');
//Óscar
   const seccionExiste = (idSeccion) => {
      return new Promise((resolve, reject) => {
        const conx = new ConexionSecciones();
       
        conx.getSeccionById(idSeccion)
        .then(msg => {
          resolve(true)
        })
        .catch(err => {

          reject(new Error('La seccion asociada no existe'));
        });
      });
    
  }
 
module.exports = {
 seccionExiste,

}

