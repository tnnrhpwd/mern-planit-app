// This file contains the functions that deal with the Plan objects( schema imported from Models) => Exported to Routes
const asyncHandler = require('express-async-handler')// sends the errors to the errorhandler

const Comment = require('../models/commentModel')

// @desc    Get comments
// @route   GET /api/comments
// @access  Private
const getComments = asyncHandler(async (req, res) => {
  // const comments = await Comment.find({ user: req.user.id }) //  where the request user matches the comment user
  const comments = await Comment.find() //  Get all users' comments


  res.status(200).json(comments) // returns json of comments
})

// @desc    Set comment
// @route   POST /api/comments
// @access  Private
const setComment = asyncHandler(async (req, res) => {
  if (!req.body.comment) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const comment = await Comment.create({
    plan: req.body.plan,
    comment: req.body.comment,
    user: req.user.id,
  })
  

  res.status(200).json(comment)
})

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id)

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

  const updatedComment = await Comment.findByIdAndUpdate(req.params.id,  { $push: req.body}, {
    new: true,
  })

  res.status(200).json(updatedComment)   // return json of updated comment
})

// @desc    Delete comment
// @route   DELETE /api/comment/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id)

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
  getComments,
  setComment,
  updateComment,
  deleteComment,
}
