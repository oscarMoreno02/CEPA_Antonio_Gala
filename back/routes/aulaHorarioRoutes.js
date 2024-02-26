//Jaime

const express = require('express')
const router = express.Router()
const controller = require('../controllers/aulaHorarioController')

router.get('/', controller.listAllHorarios)
router.get('/:id', controller.listHorario)
router.get('/aula/:id', controller.listAllHorariosOfAula)
router.get('/aula/:id/reservas/:day/:month/:year', controller.listReservaOfAulaOnDay)
router.post('/', controller.createHorario)
router.put('/:id', controller.editHorario)
router.delete('/:id', controller.removeHorario)

module.exports = router