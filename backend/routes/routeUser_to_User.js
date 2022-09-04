// This file imports the User_to_User object schema + functions | Routers listen for requests then execute callback functions 
const express = require('express')
const router = express.Router()
const {
  getUser_to_User,
  setUser_to_User,
  updateUser_to_User,
  deleteUser_to_User,
} = require('../controllers/controllerUser_to_User')

// Declare authentication variable
const { protect } = require('../middleware/authMiddleware')

// listens for HTTP requests on /api/user_to_user/
router.route('/').get(getUser_to_User).post(protect, setUser_to_User) // GET + POST -- The protect middleware here prevents access from users without JWT
router.route('/:id').delete(protect, updateUser_to_User).put(protect, deleteUser_to_User) // DELETE + UPDATE -- The protect middleware here prevents access from users without JWT

module.exports = router
