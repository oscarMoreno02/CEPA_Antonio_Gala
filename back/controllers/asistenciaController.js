/*Laura María Pedraza Gómez* */
const { response, request } = require('express');
const ConexionAsistencia = require('../database/conexionAsistencia');
const ConexionEvento = require('../database/conexionEvento');

const obtenerAsistencias = async (req, res = response) => {
    const conx = new ConexionAsistencia();

    try {
        const asistencias = await conx.getAsistencias();
        res.status(200).json(asistencias);
    } catch (err) {
        res.status(404).json({ 'msg': 'No se han encontrado registros' });
    }
}

const obtenerAsistenciaPorId = async (req, res = response) => {
    const conx = new ConexionAsistencia();

    try {
        const asistencia = await conx.getAsistenciaPorId(req.params.id);
        res.status(200).json(asistencia);
    } catch (err) {
        res.status(404).json({ 'msg': 'No se ha encontrado el registro' });
    }
}

const obtenerAsistenciasDeUsuario = async (req, res = response) => {
    const conx = new ConexionAsistencia();

    try{
        const asistencias = await conx.getAsistenciasUsuario(req.params.userId);
        res.status(200).json(asistencias)
    } catch (err){
        res.status(404).json({ 'msg':'No se han encontrado asistencias por el usuario introducido'});
    }
}

const obtenerUsuariosDeEvento = async (req, res = response) => {
    const conx = new ConexionAsistencia();
    const eventoId = req.params.eventoId;
    try{
        const asistencias = await conx.getUsuariosEvento(eventoId);
        res.status(200).json(asistencias)
    } catch (err){
        res.status(404).json({ 'msg':'No se han encontrado usuarios para el evento introducido'});
    }
}

const obtenerAsistenciaEventoUsuario = async (req, res) => {
    const conx = new ConexionAsistencia();
    try {
        const asistencia = await conx.getAsistencia(req.params.eventoId, req.params.usuarioId)
        res.status(200).json(asistencia)
    }catch(err){
        res.status(404).json({'msg':'No se ha encontrado ninguna asistencia para el usuario en el evento especificado'});
    }
}

const subirAsistencia = async (req = request, res = response) => {
    const conx = new ConexionAsistencia();
    try {
        const asistencia = await conx.postAsistencia(req.body);
        res.status(200).json(asistencia);
    } catch (err) {
        res.status(404).json(err);
    }
}

const borrarAsistencia = async (req, res = response) => {
    const conx = new ConexionAsistencia();

    try {
        const asistencia = await conx.deleteAsistencia(req.params.id);
        res.status(200).json(asistencia);
    } catch (err) {

        res.status(404).json(err);
    }
}

module.exports = {
    obtenerAsistencias,
    obtenerAsistenciaPorId,
    borrarAsistencia,
    subirAsistencia,
    obtenerAsistenciasDeUsuario,
    obtenerUsuariosDeEvento,
    obtenerAsistenciaEventoUsuario
};
