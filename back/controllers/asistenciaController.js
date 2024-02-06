const { response, request } = require('express');
const ConexionAsistencia = require('../database/conexionAsistencia');

const obtenerAsistencias = async (req, res = response) => {
    const conx = new ConexionAsistencia();

    try {
        const asistencias = await conx.getAsistencia();
        console.log('Listado correcto!');
        res.status(200).json(asistencias);
    } catch (err) {
        console.log('No hay registros');
        res.status(203).json({ 'msg': 'No se han encontrado registros' });
    }
}

const obtenerAsistenciaPorId = async (req, res = response) => {
    const conx = new ConexionAsistencia();

    try {
        const asistencia = await conx.getAsistenciaPorId(req.params.id);
        console.log('Listado correcto!');
        res.status(200).json(asistencia);
    } catch (err) {
        console.log('No hay registro!');
        res.status(203).json({ 'msg': 'No se ha encontrado el registro' });
    }
}

const obtenerAsistenciasDeUsuario = async (req, res = response) => {
    const conx = new ConexionAsistencia();

    try{
        const asistencias = await conx.getAsistenciasUsuario(req.params.userId);
        console.log('Asistencias obtenidas');
        res.status(200).json(asistencias)
    } catch (err){
        console.log('No se han encontrado asistencias')
        res.status(203).json({ 'msg':'No se han encontrado asistencias por el usuario introducido'});
    }
}

const obtenerUsuariosDeEvento = async (req, res = response) => {
    const conx = new ConexionAsistencia();

    try{
        const asistencias = await conx.getUsuariosEventos(req.params.eventoId);
        console.log('Asistencias obtenidas');
        res.status(200).json(asistencias)
    } catch (err){
        console.log('No se han encontrado asistencias')
        res.status(203).json({ 'msg':'No se han encontrado usuarios para el evento introducido'});
    }
}

const subirAsistencia = async (req = request, res = response) => {
    const conx = new ConexionAsistencia();

    try {
        const asistencia = await conx.postAsistencia(req.body);
        console.log('Insertado correctamente!');
        res.status(201).json(asistencia);
    } catch (err) {
        console.log('Fallo en el registro!');
        res.status(203).json(err);
    }
}

const borrarAsistencia = async (req, res = response) => {
    const conx = new ConexionAsistencia();

    try {
        const asistencia = await conx.deleteAsistencia(req.params.id);
        console.log('Eliminado correctamente!');
        res.status(202).json(asistencia);
    } catch (err) {
        console.log('Fallo en la eliminación!');
        res.status(203).json(err);
    }
}

module.exports = {
    obtenerAsistencias,
    obtenerAsistenciaPorId,
    borrarAsistencia,
    subirAsistencia,
    obtenerAsistenciasDeUsuario,
    obtenerUsuariosDeEvento
};