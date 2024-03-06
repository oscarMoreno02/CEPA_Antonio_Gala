//Raúl

const {response,request} = require('express');
const Conexion = require('../database/conexionUsuario');

const usuariosGet =  (req, res = response) => {
    
    const conx = new Conexion();
    conx.getUsuarios()    
        .then( msg => {
            res.status(200).json(msg);
        })
        .catch( err => {

            res.status(404).json()
        });
}

const usuarioGet =  (req, res = response) => {
    const conx = new Conexion();
    conx.getUsuario(req.params.id)    
        .then( msg => {

            res.status(200).json(msg);
        })
        .catch( err => {
           
            res.status(200).json({'msg':'No se ha encontrado el registro'});
        });
}

const usuariosPost =  (req = request, res = response) => {
    const conx = new Conexion();
    conx.postUsuarios(req.body)    
        .then( msg => {
         
            res.status(201).json(msg);
        })
        .catch( err => {
           
            res.status(203).json(err);
        });
}

const usuariosDelete =  (req, res) => {
    const conx = new Conexion();
    conx.deleteUsuarios(req.params.id)    
        .then( msg => {
           
            res.status(202).json(msg);
        })
        .catch( err => {
        
            res.status(203).json(err);
        });
}

const usuariosPut =  (req, res = response) => {
    const conx = new Conexion();
    conx.putUsuarios(req.params.id, req.body)    
        .then( msg => {
 
            res.status(202).json(msg);
        })
        .catch( err => {
        
            res.status(203).json(err);
        });
}


module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPut,
    usuarioGet
}