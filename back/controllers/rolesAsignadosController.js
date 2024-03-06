//Raúl

const {response,request} = require('express');
const Conexion = require('../database/conexionRolesAsignados');

const rolesAsignadosGet =  (req, res = response) => {
    const conx = new Conexion();
    conx.rolesAsignadosGet()    
        .then( msg => {
  
            res.status(200).json(msg);
        })
        .catch( err => {
           
            res.status(200).json({'msg':'No se han encontrado registros'});
        });
}

const rolesAsignadosGetIdUsu =  (req, res = response) => {
    const conx = new Conexion();
    conx.rolesAsignadosGetId(req.params.idUser)    
        .then( msg => {
     
            res.status(200).json(msg);
        })
        .catch( err => {

            res.status(200).json({'msg':'No se han encontrado registros'});
        });
}

const rolesAsignadosPost =  (req = request, res = response) => {
    const conx = new Conexion();
    conx.rolesAsignadosPost(req.body)    
        .then( msg => {
  
            res.status(201).json(msg);
        })
        .catch( err => {
      
            res.status(203).json(err);
        });
}

const rolesAsignadosDelete =  (req, res) => {
    const conx = new Conexion();
    conx.rolesAsignadosDelete(req.params.id)    
        .then( msg => {
 
            res.status(202).json(msg);
        })
        .catch( err => {
        
            res.status(203).json(err);
        });
}

const rolesAsignadosPut =  (req, res = response) => {
    const conx = new Conexion();
    conx.rolesAsignadosPut(req.params.id, req.body.nombre)    
        .then( msg => {
  
            res.status(202).json(msg);
        })
        .catch( err => {

            res.status(203).json(err);
        });
}


module.exports = {
    rolesAsignadosGet,
    rolesAsignadosGetIdUsu,
    rolesAsignadosDelete,
    rolesAsignadosPost,
    rolesAsignadosPut
}