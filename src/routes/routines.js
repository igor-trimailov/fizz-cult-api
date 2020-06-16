const express = require('express')
const router = express.Router()
const routinesController = require('../api/controllers/routines')
const usersValidator = require('../api/validators/users')

// public routes
router.get('/', routinesController.getAll)
router.get('/:routineId', routinesController.getById)

// authenticated routes
router.post('/', usersValidator, routinesController.create)
router.put('/:routineId', usersValidator, routinesController.updateById)
router.delete('/:routineId', usersValidator, routinesController.deleteById)

module.exports = router
