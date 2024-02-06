const {response,request} = require('express');
const Conexion = require('../database/conexionRolesAsignados');

const rolesAsignadosGet =  (req, res = response) => {
    const conx = new Conexion();
    conx.getRolesAsignados()    
        .then( msg => {
            console.log('Listado correcto!');
            res.status(200).json(msg);
        })
        .catch( err => {
            console.log('No hay registros');
            res.status(200).json({'msg':'No se han encontrado registros'});
        });
}

const rolesAsignadosPost =  (req = request, res = response) => {
    const conx = new Conexion();
    conx.registrarRolesAsignados(req.body.id, req.body.nombre)    
        .then( msg => {
            console.log('Insertado correctamente!');
            res.status(201).json(msg);
        })
        .catch( err => {
            console.log('Fallo en el registro!');
            res.status(203).json(err);
        });
}

const rolesAsignadosDelete =  (req, res) => {
    const conx = new Conexion();
    conx.borrarRolesAsignados(req.params.id)    
        .then( msg => {
            console.log('Borrado correctamente!');  //Podemos acceder a este valor de req porque lo hemos almacenado en el middleware validarHWT extrayendo la información del token.
            res.status(202).json(msg);
        })
        .catch( err => {
            console.log('Fallo en el borrado!');
            res.status(203).json(err);
        });
}

const rolesAsignadosPut =  (req, res = response) => {
    const conx = new Conexion();
    conx.modificarRolesAsignados(req.params.id, req.body.nombre)    
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
    rolesAsignadosGet,
    rolesAsignadosDelete,
    rolesAsignadosPost,
    rolesAsignadosPut
}