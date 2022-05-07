// This file imports the User object schema + functions | Routers listen for requests then execute callback functions 
const express = require('express')
const router = express.Router()
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/controllerGoal')

// Declare authentication variable
const { protect } = require('../middleware/authMiddleware')

// listens for HTTP requests on /api/goals/
router.route('/').get(getGoals).post(protect, setGoal) // GET + POST -- The protect middleware here prevents access from users without JWT
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal) // DELETE + UPDATE -- The protect middleware here prevents access from users without JWT

module.exports = router
