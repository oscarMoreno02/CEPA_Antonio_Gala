//Jaime

const express = require('express')
const router = express.Router()
const controller = require('../controllers/aulaFranjaController')
const { check } = require('express-validator')
const { validateValues } = require('../helpers/validar-campos')
const authMid = require('../middlewares/validarJWT')
const accessMid = require('../middlewares/validarRoles')
// const aulaFranjaMid = require('../middlewares/aulaFranjaMid')

router.get('/', controller.listAllFranjas)
router.get('/:id', controller.listFranja)

router.post('/', [
    check('turno').notEmpty(),
    check('horaInicio').isTime().notEmpty(),
    check('horaFin').isTime().notEmpty(),
    validateValues
], authMid.validarJWT, accessMid.esJefeDeEstudios, controller.createFranja)

router.put('/sort', authMid.validarJWT, accessMid.esJefeDeEstudios, controller.sortFranjas)



router.put('/:id', [
    check('turno').notEmpty(),
    check('horaInicio').isTime().notEmpty(),
    check('horaFin').isTime().notEmpty(),
    validateValues
], authMid.validarJWT, accessMid.esJefeDeEstudios, controller.editFranja)



router.delete('/:id', authMid.validarJWT, accessMid.esJefeDeEstudios, controller.removeFranja)

module.exports = router