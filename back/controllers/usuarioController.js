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
            console.log(err)
            res.status(404).json()
        });
}

const usuarioGet =  (req, res = response) => {
    const conx = new Conexion();
    conx.getUsuario(req.params.id)    
        .then( msg => {
            console.log('Listado correcto!');
            res.status(200).json(msg);
        })
        .catch( err => {
            console.log('No hay registro!');
            res.status(200).json({'msg':'No se ha encontrado el registro'});
        });
}

const usuariosPost =  (req = request, res = response) => {
    const conx = new Conexion();
    conx.postUsuarios(req.body.id, req.body.nombre, req.body.email, req.body.password)    
        .then( msg => {
            console.log('Insertado correctamente!');
            res.status(201).json(msg);
        })
        .catch( err => {
            console.log('Fallo en el registro!');
            res.status(203).json(err);
        });
}

const usuariosDelete =  (req, res) => {
    const conx = new Conexion();
    conx.deleteUsuarios(req.params.id)    
        .then( msg => {
            console.log('Borrado correctamente!');  //Podemos acceder a este valor de req porque lo hemos almacenado en el middleware validarHWT extrayendo la información del token.
            res.status(202).json(msg);
        })
        .catch( err => {
            console.log('Fallo en el borrado!');
            res.status(203).json(err);
        });
}

const usuariosPut =  (req, res = response) => {
    const conx = new Conexion();
    conx.putUsuarios(req.params.id, req.body.nombre, req.body.email, req.body.password)    
        .then( msg => {
            console.log('Modificado correctamente!');
            res.status(202).json(msg);
        })
        .catch( err => {
            console.log('Fallo en la modificación!');
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