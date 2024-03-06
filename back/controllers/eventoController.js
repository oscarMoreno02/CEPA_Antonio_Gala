/*Laura María Pedraza Gómez* */
const { response, request } = require('express');
const EventoConexion = require('../database/conexionEvento');

const obtenerEventos = (req, res = response) => {
    const conx = new EventoConexion();

    conx.getEventos()
        .then((eventos) => {
            console.log('Listado correcto!');
            res.status(200).json(eventos);
        })
        .catch((err) => {
            console.log('No hay registros');
            res.status(404).json({ 'msg': 'No se han encontrado registros' });
        });
}

const obtenerEventoPorId = (req, res = response) => {
    const conx = new EventoConexion();

    conx.getEventoPorId(req.params.id)
        .then((evento) => {
            console.log('Listado correcto!');
            res.status(200).json(evento);
        })
        .catch((err) => {
            console.log('No hay registro!');
            res.status(404).json({ 'msg': 'No se ha encontrado el registro' });
        });
}

const subirEvento = (req = request, res = response) => {
    const conx = new EventoConexion();

    conx.postEvento(req.body)
        .then((evento) => {
            console.log('Insertado correctamente!');
            res.status(200).json(evento);
        })
        .catch((err) => {
            console.log('Fallo en el registro!');
            res.status(404).json(err);
        });
}

const borrarEvento = (req, res = response) => {
    const conx = new EventoConexion();

    conx.deleteEvento(req.params.id)
        .then((evento) => {
            console.log('Eliminado correctamente!');
            res.status(200).json(evento);
        })
        .catch((err) => {
            console.log('Fallo en la eliminación!');
            res.status(404).json(err);
        });
}

const actualizarEvento = (req, res = response) => {
    const conx = new EventoConexion();

    conx.updateEvento(req.params.id, req.body)
        .then((evento) => {
            console.log('Modificado correctamente!');
            res.status(200).json(evento);
        })
        .catch((err) => {
            console.log('Fallo en la modificación!');
            res.status(404).json(err);
        });
}

const aumentarMg = (req, res) => {
    const conx = new EventoConexion()
    conx.plusMgEvento(req.params.id)
        .then((evento) => {
            console.log('Mg aumentado correctamente!');
            res.status(200).json(evento);
        })
        .catch((err) => {
            console.log('Fallo al añadir el mg!');
            res.status(404).json(err);
        });
}

const obtenerNumAsistentes = (req, res) => {
    const conx = new EventoConexion()
    conx.getNumAsistentesEvento(req.params.id)
        .then((asistencias) => {
            console.log('Numero de asistentes obtenido correctamente')
            res.status(200).json(asistencias)
        })
        .catch((err) => {
            console.log('Fallo al obtener el número de asistentes')
            res.status(404).json(err)
        })
    
}

const eliminarAsistente = (req, res) => {
    const conx = new EventoConexion()
    conx.deleteAsistenteEvento(req.params.id)
        .then((evento) => {
            console.log('Asistente eliminado correctamente!');
            res.status(200).json(evento);
        })
        .catch((err) => {
            console.log('Fallo al eliminar el asistente!');
            res.status(404).json(err);
        });
}

const anadirAsistente = (req, res) => {
    const conx = new EventoConexion()
    conx.putAsistenteEvento(req.params.id)
        .then((evento) => {
            console.log('Asistente eliminado correctamente!');
            res.status(200).json(evento);
        })
        .catch((err) => {
            console.log('Fallo al eliminar el asistente!');
            res.status(404).json(err);
        });
}

module.exports = {
    obtenerEventos,
    obtenerEventoPorId,
    actualizarEvento,
    subirEvento,
    borrarEvento,
    aumentarMg,
    obtenerNumAsistentes,
    eliminarAsistente,
    anadirAsistente
}
