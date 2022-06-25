// This file imports the Action object schema + functions | Routers listen for requests then execute callback functions 
const express = require('express')
const router = express.Router()
const {
    getActions,
    setAction,
    updateAction,
    deleteAction,
} = require('../controllers/controllerAction')

// Declare authentication variable
const { protect } = require('../middleware/authMiddleware')

// listens for HTTP requests on /api/actions/
router.route('/').get(getActions).post(protect, setAction) // GET + POST -- The protect middleware here prevents access from users without JWT
router.route('/:id').delete(protect, updateAction).put(protect, deleteAction) // DELETE + UPDATE -- The protect middleware here prevents access from users without JWT

module.exports = router
