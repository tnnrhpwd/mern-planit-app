// This file imports the Comment object schema + functions | Routers listen for requests then execute callback functions 
const express = require('express')
const router = express.Router()
const {
    getComments,
    setComment,
    updateComment,
    deleteComment,
} = require('../controllers/controllerComment')

// Declare authentication variable
const { protect } = require('../middleware/authMiddleware')

// listens for HTTP requests on /api/comments/
router.route('/').get(getComments).post(protect, setComment) // GET + POST -- The protect middleware here prevents access from users without JWT
router.route('/:id').delete(protect, updateComment).put(protect, deleteComment) // DELETE + UPDATE -- The protect middleware here prevents access from users without JWT

module.exports = router
