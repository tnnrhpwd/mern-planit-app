// This file imports the User object schema + functions | Routers listen for requests then execute callback functions 
const express = require('express')
const router = express.Router()
const {
  getPlans,
  setPlan,
  updatePlan,
  deletePlan,
} = require('../controllers/controllerPlan')

// Declare authentication variable
const { protect } = require('../middleware/authMiddleware')

// listens for HTTP requests on /api/plans/
router.route('/').get(getPlans).post(protect, setPlan) // GET + POST -- The protect middleware here prevents access from users without JWT
router.route('/:id').delete(protect, deletePlan).put(protect, updatePlan) // DELETE + UPDATE -- The protect middleware here prevents access from users without JWT

module.exports = router
