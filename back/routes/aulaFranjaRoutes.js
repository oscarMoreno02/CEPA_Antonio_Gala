const express = require('express')
const router = express.Router()
const controller = require('../controllers/aulaFranjaController')

router.get('/', controller.listAllFranjas)
router.get('/:id', controller.listFranja)
router.post('/', controller.createFranja)
router.put('/:id', controller.editFranja)
router.delete('/:id', controller.removeFranja)

module.exports = router