/*Laura María Pedraza Gómez* */
const { response, request } = require('express');
const GaleriaConexion = require('../database/conexionGaleria');

const obtenerGalerias = (req, res = response) => {
    const conx = new GaleriaConexion();

    conx.getGalerias()
        .then((galerias) => {
   
            res.status(200).json(galerias);
        })
        .catch((err) => {
          
            res.status(404).json({ 'msg': 'No se han encontrado registros' });
        });
}

const obtenerGaleriaPorId = (req, res = response) => {
    const conx = new GaleriaConexion();

    conx.getGaleriaPorId(req.params.id)
        .then((galeria) => {
            
            res.status(200).json(galeria);
        })
        .catch((err) => {
      
            res.status(404).json({ 'msg': 'No se ha encontrado el registro' });
        });
}

const subirGaleria = (req = request, res = response) => {
    const conx = new GaleriaConexion();

    conx.postGaleria(req.body)
        .then((galeria) => {
          
            res.status(200).json(galeria);
        })
        .catch((err) => {
           
            res.status(404).json(err);
        });
}

const borrarGaleria = (req, res = response) => {
    const conx = new GaleriaConexion();

    conx.deleteGaleria(req.params.id)
        .then((galeria) => {
            
            res.status(200).json(galeria);
        })
        .catch((err) => {
          
            res.status(404).json(err);
        });
}

const obtenerGaleriaEvento = (req, res) => {
    const conx = new GaleriaConexion()
    
    conx.getGaleriaEvento(req.params.id)
    .then((galeria) => {
   
        res.status(200).json(galeria);
    })
    .catch((err) => {

        res.status(404).json(err);
    });
}

module.exports = {
    obtenerGalerias,
    obtenerGaleriaPorId,
    subirGaleria,
    borrarGaleria,
    obtenerGaleriaEvento
}
