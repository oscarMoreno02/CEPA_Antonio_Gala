const {response,request} = require('express');
const Conexion = require('../database/conexionRoles');

const rolesGet =  (req, res = response) => {
    
    const conx = new Conexion();
    conx.getRoles()    
        .then( msg => {
            console.log('Listado correcto!');
            res.status(200).json(msg);
        })
        .catch( err => {
            console.log('No hay registros');
            res.status(200).json({'msg':'No se han encontrado registros'});
        });
}

const rolesPost =  (req = request, res = response) => {
    const conx = new Conexion();
    conx.registrarRoles(req.body.id, req.body.nombre)    
        .then( msg => {
            console.log('Insertado correctamente!');
            res.status(201).json(msg);
        })
        .catch( err => {
            console.log('Fallo en el registro!');
            res.status(203).json(err);
        });
}

const rolesDelete =  (req, res) => {
    const conx = new Conexion();
    conx.borrarRoles(req.params.id)    
        .then( msg => {
            console.log('Borrado correctamente!');  //Podemos acceder a este valor de req porque lo hemos almacenado en el middleware validarHWT extrayendo la información del token.
            res.status(202).json(msg);
        })
        .catch( err => {
            console.log('Fallo en el borrado!');
            res.status(203).json(err);
        });
}

const rolesPut =  (req, res = response) => {
    const conx = new Conexion();
    conx.modificarRoles(req.params.id, req.body.nombre)    
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
    rolesGet,
    rolesDelete,
    rolesPost,
    rolesPut
}