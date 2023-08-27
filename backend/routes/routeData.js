// This file imports the data object schema + functions | Routers listen for requests then execute callback functions 
const express = require('express')
const router = express.Router()
const {
  getData,
  setData,
  updateData,
  deleteData,
  registerUser,
  loginUser,
} = require('../controllers/controllerData')

// Declare authentication variable
const { protect } = require('../middleware/authMiddleware')

// listens for HTTP requests on /api/data/
router.route('/').get(getData).post(setData) // GET + POST -- The protect middleware here prevents access from users without JWT
router.route('/:id').delete(protect, updateData).put(protect, deleteData) // DELETE + UPDATE -- The protect middleware here prevents access from users without JWT
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router
