//Jaime

const express = require('express')
const router = express.Router()
const controller = require('../controllers/aulaReservaController')

router.get('/data/', controller.listAllReservasWithData)
router.get('/', controller.listAllReservas)
router.get('/:id', controller.listReserva)
router.get('/aula/:id', controller.listAllReservasOfClaseWithData)
router.post('/', controller.createReserva)
router.put('/:id', controller.editReserva)
router.delete('/:id', controller.removeReserva)

module.exports = router