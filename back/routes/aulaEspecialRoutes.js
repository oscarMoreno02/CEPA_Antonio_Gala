//Jaime

const express = require('express')
const router = express.Router()
const controller = require('../controllers/aulaEspecialController')
const { check } = require('express-validator')
const { validateValues } = require('../helpers/validar-campos')
const authMid = require('../middlewares/validarJWT')
const accessMid = require('../middlewares/validarRoles')
const aulaEspecialMid = require('../middlewares/aulaEspecialMid')

router.get('/', controller.listAllAulas)
router.get('/:id', controller.listAula)
router.get('/data/:id', controller.listAulaWithData)

router.post('/',
[
    check('nombre').isString().notEmpty().isLength({ min: 2, max: 50 }),
    validateValues
], authMid.validarJWT, accessMid.esJefeDeEstudios, aulaEspecialMid.nombreEnUsoAula, controller.createAula)

router.put('/:id', [
    check('nombre').isString().notEmpty().isLength({ min: 2, max: 50 }),
    validateValues
], authMid.validarJWT, accessMid.esJefeDeEstudios, aulaEspecialMid.nombreEnUsoAula, controller.editAula)

router.delete('/:id', authMid.validarJWT, accessMid.esJefeDeEstudios, controller.removeAula)

module.exports = router