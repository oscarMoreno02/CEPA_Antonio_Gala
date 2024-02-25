//Jaime

const express = require('express')
const router = express.Router()
const controller = require('../controllers/aulaEspecialController')

router.get('/', controller.listAllAulas)
router.get('/:id', controller.listAula)
router.get('/data/:id', controller.listAulaWithData)
router.post('/', controller.createAula)
router.put('/:id', controller.editAula)
router.delete('/:id', controller.removeAula)

module.exports = router