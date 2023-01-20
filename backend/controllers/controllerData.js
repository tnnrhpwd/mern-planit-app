// This file contains the functions that deal with the Data objects( schema imported from Models) => Exported to Routes
const asyncHandler = require('express-async-handler')// sends the errors to the errorhandler

const data = require('../models/dataModel')

// @desc    Get Data
// @route   GET /api/Data
// @access  Private
const getData = asyncHandler(async (req, res) => {
  // const data = await data.find({ data: req.user.id }) //  where the request user matches the data user
  const data = await data.find() //  Get all data


  res.status(200).json(data) // returns json of comments
})

// @desc    Set data
// @route   POST /api/data
// @access  Private
const setData = asyncHandler(async (req, res) => {
  if (!req.body.data) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const data = await data.create({
    data: req.body.data,
  })
  

  res.status(200).json(data)
})

// @desc    Update Data
// @route   PUT /api/Data/:id
// @access  Private
const updateData = asyncHandler(async (req, res) => {
  const comment = await Data.findById(req.params.id)

  if (!data) {
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
const deleteData = asyncHandler(async (req, res) => {
  const comment = await Data.findById(req.params.id)

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
  getData,
  setData,
  updateData,
  deleteData,
}
