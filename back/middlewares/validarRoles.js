const { response, request } = require('express');
//Óscar

const esAdmin = (req, res, next) => {
    if (!req.uid) {
        return res.status(500).json({ 'msg': 'No es posible el acceso como administrador.' })
    }

    if (req.abilities.includes('Administrador')) {
        next()
    } else {
        return res.status(401).json('Acceso no autorizado')
    }
}

//Jaime
const esJefeDeEstudios = (req, res, next) => {
    if (!req.uid) {
        return res.status(500).json({ 'msg': 'No es posible el acceso como jefe de estudios.' })
    }

    if (req.abilities.includes('Jefe de estudios')) {
        next()
    } else {
        return res.status(401).json('Acceso no autorizado')
    }
}

module.exports = {
    esAdmin,
    esJefeDeEstudios
}