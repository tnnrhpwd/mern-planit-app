// This file imports the User object schema + functions | Routers listen for requests then execute callback functions 
const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
} = require('../controllers/controllerUser');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser)      // HTTP method to handle post requests at /api/users/         
router.post('/login', loginUser)    // HTTP method to handle post requests at /api/users/login    -- user sends login details to /api/users/login
router.get('/me', protect, getMe)   // HTTP method to handle get requests at /api/users/me        -- user receives user details. uses JWT middleware to confirm same user as POST

module.exports = router