const { response, request } = require('express');
const GaleriaConexion = require('../database/conexionGaleria');

const obtenerGalerias = (req, res = response) => {
    const conx = new GaleriaConexion();

    conx.getGalerias()
        .then((galerias) => {
            console.log('Listado correcto!');
            res.status(200).json(galerias);
        })
        .catch((err) => {
            console.log('No hay registros');
            res.status(203).json({ 'msg': 'No se han encontrado registros' });
        });
}

const obtenerGaleriaPorId = (req, res = response) => {
    const conx = new GaleriaConexion();

    conx.getGaleriaPorId(req.params.id)
        .then((galeria) => {
            console.log('Listado correcto!');
            res.status(200).json(galeria);
        })
        .catch((err) => {
            console.log('No hay registro!');
            res.status(203).json({ 'msg': 'No se ha encontrado el registro' });
        });
}

const subirGaleria = (req = request, res = response) => {
    const conx = new GaleriaConexion();

    conx.postGaleria(req.body)
        .then((galeria) => {
            console.log('Insertado correctamente!');
            res.status(201).json(galeria);
        })
        .catch((err) => {
            console.log('Fallo en el registro!');
            res.status(203).json(err);
        });
}

const borrarGaleria = (req, res = response) => {
    const conx = new GaleriaConexion();

    conx.deleteGaleria(req.params.id)
        .then((galeria) => {
            console.log('Eliminado correctamente!');
            res.status(202).json(galeria);
        })
        .catch((err) => {
            console.log('Fallo en la eliminación!');
            res.status(203).json(err);
        });
}

module.exports = {
    obtenerGalerias,
    obtenerGaleriaPorId,
    subirGaleria,
    borrarGaleria
}
