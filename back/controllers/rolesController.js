//Raúl

const {response,request} = require('express');
const Conexion = require('../database/conexionRoles');

const rolesGet =  (req, res = response) => {
    
    const conx = new Conexion();
    conx.rolesGet()    
        .then( msg => {
     
            res.status(200).json(msg);
        })
        .catch( err => {

            res.status(200).json({'msg':'No se han encontrado registros'});
        });
}

const rolesPost =  (req = request, res = response) => {
    const conx = new Conexion();
    conx.rolesPost(req.body)    
        .then( msg => {
          
            res.status(201).json(msg);
        })
        .catch( err => {

            res.status(203).json(err);
        });
}

const rolesDelete =  (req, res) => {
    const conx = new Conexion();
    conx.rolesDelete(req.params.id)    
        .then( msg => {
      
            res.status(202).json(msg);
        })
        .catch( err => {
      
            res.status(203).json(err);
        });
}

const rolesPut =  (req, res = response) => {
    const conx = new Conexion();
    conx.rolesPut(req.params.id, req.body)    
        .then( msg => {
         
            res.status(202).json(msg);
        })
        .catch( err => {
         
            res.status(203).json(err);
        });
}


module.exports = {
    rolesGet,
    rolesDelete,
    rolesPost,
    rolesPut
}