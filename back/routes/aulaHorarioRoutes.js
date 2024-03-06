//Jaime

const express = require('express')
const router = express.Router()
const controller = require('../controllers/aulaHorarioController')
const { check } = require('express-validator')
const { validateValues } = require('../helpers/validar-campos')
const authMid = require('../middlewares/validarJWT')
const accessMid = require('../middlewares/validarRoles')
const aulaEspecialValidator = require('../helpers/aulaEspecial-validators')
const aulaFranjaValidator = require('../helpers/aulaFranja-validators')

router.get('/', controller.listAllHorarios)
router.get('/:id', controller.listHorario)
router.get('/aula/:id', controller.listAllHorariosOfAula)
router.get('/aula/:id/reservas/:day/:month/:year', controller.listReservaOfAulaOnDay)

router.post('/', [
    check('idAula').custom(aulaEspecialValidator.aulaEspecialExiste),
    check('idFranja').custom(aulaFranjaValidator.aulaFranjaExiste),
    validateValues
], authMid.validarJWT, accessMid.esJefeDeEstudios, controller.createHorario)

router.put('/:id', [
    check('idAula').custom(aulaEspecialValidator.aulaEspecialExiste),
    check('idFranja').custom(aulaFranjaValidator.aulaFranjaExiste),
    validateValues
], authMid.validarJWT, accessMid.esJefeDeEstudios, controller.editHorario)

router.delete('/:id', authMid.validarJWT, accessMid.esJefeDeEstudios, controller.removeHorario)

module.exports = router