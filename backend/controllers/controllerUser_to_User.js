// This file contains the functions that deal with the User to User objects( schema imported from Models) => Exported to Routes
const asyncHandler = require('express-async-handler')// sends the errors to the errorhandler

const User_to_User = require('../models/user_to_userModel')

// @desc    Get user_to_user
// @route   GET /api/user_to_user
// @access  Private
const getUser_to_User = asyncHandler(async (req, res) => {
  // const user_to_user = await user_to_user.find({ user: req.user.id }) //  where the request user matches the user_to_user user
  const user_to_user = await User_to_User.find() //  Get all User_to_User


  res.status(200).json(user_to_user) // returns json of comments
})

// @desc    Set user_to_user
// @route   POST /api/user_to_user
// @access  Private
const setUser_to_User = asyncHandler(async (req, res) => {
  if (!req.body.user_to_user) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const comment = await User_to_User.create({
    topic: req.body.topic,
    comment: req.body.comment,
    user: req.user.id,
  })
  

  res.status(200).json(comment)
})

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
const updateUser_to_User = asyncHandler(async (req, res) => {
  const comment = await User_to_User.findById(req.params.id)

  if (!comment) {
    res.status(400)
    throw new Error('Comment not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the comment user
  if (comment.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedComment = await User_to_User.findByIdAndUpdate(req.params.id,  { $push: req.body}, {
    new: true,
  })

  res.status(200).json(updatedComment)   // return json of updated comment
})

// @desc    Delete comment
// @route   DELETE /api/comment/:id
// @access  Private
const deleteUser_to_User = asyncHandler(async (req, res) => {
  const comment = await User_to_User.findById(req.params.id)

  if (!comment) {
    res.status(400)
    throw new Error('Comment not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the comment user
  if (comment.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await comment.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
    getUser_to_User,
  setUser_to_User,
  updateUser_to_User,
  deleteUser_to_User,
}
