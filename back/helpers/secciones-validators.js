const {response,request} = require('express');
const ConexionNoticias= require('../database/conexionNoticias');
//Óscar
   const noticiaExiste = (idNoticia) => {
      return new Promise((resolve, reject) => {
        const conx = new ConexionNoticias();
        conx.getNoticiaById(idNoticia)
        .then(msg => {
          resolve(true)
        })
        .catch(err => {
          reject(new Error('La noticia asociada no existe'));
        });
      });
    
  }
 
module.exports = {
 noticiaExiste,

}

