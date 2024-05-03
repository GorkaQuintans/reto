const express = require('express')
const router = express.Router()
const logController = require("../controllers/logController")

router.get('/', logController.log_lista)

router.get('/:id', logController.log_detalle)

router.post('/', logController.log_crear)

router.patch('/:id', logController.log_actualizar)

router.delete('/:id', logController.log_eliminar)

module.exports = router