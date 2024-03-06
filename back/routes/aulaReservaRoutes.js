//Jaime

const express = require('express')
const router = express.Router()
const controller = require('../controllers/aulaReservaController')
const { check } = require('express-validator')
const { validateValues } = require('../helpers/validar-campos')
const authMid = require('../middlewares/validarJWT')
// const accessMid = require('../middlewares/validarRoles')
const aulaEspecialValidator = require('../helpers/aulaEspecial-validators')
const aulaFranjaValidator = require('../helpers/aulaFranja-validators')

router.get('/data/', controller.listAllReservasWithData)
router.get('/', controller.listAllReservas)
router.get('/:id', controller.listReserva)
router.get('/aula/:id', controller.listAllReservasOfClaseWithData)
router.get('/profesor/:id', controller.listAllReservasOfProfesorWithData)

router.post('/', [
    check('idAula').custom(aulaEspecialValidator.aulaEspecialExiste).notEmpty(),
    check('idHorario').custom(aulaFranjaValidator.aulaFranjaExiste).notEmpty(),
    check('idProfesor'),
    check('fecha').notEmpty(),
    validateValues
], authMid.validarJWT, controller.createReserva)

router.put('/:id', [
    check('idAula').custom(aulaEspecialValidator.aulaEspecialExiste).notEmpty(),
    check('idHorario').custom(aulaFranjaValidator.aulaFranjaExiste).notEmpty(),
    check('idProfesor'),
    check('fecha').notEmpty(),
    validateValues
], authMid.validarJWT, controller.editReserva)

router.delete('/:id', authMid.validarJWT, controller.removeReserva)

module.exports = router