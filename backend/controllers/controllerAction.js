// This file contains the functions that deal with the Action objects( schema imported from Models) => Exported to Routes
const asyncHandler = require('express-async-handler')// sends the errors to the errorhandler
var mongoose = require('mongoose');

const Action = require('../models/actionModel')

// @desc    Get actions
// @route   GET /api/actions
// @access  Private
const getActions = asyncHandler(async (req, res) => {
  // const actions = await Action.find({ user: req.user.id }) //  where the request user matches the action user
  const actions = await Action.find() //  Get all users' actions


  res.status(200).json(actions) // returns json of actions
})

// @desc    Set action
// @route   POST /api/actions
// @access  Private
const setAction = asyncHandler(async (req, res) => {
  if (!req.body.topic) {   // GUARD CLAUSE - no topic
    res.status(400)
    throw new Error('Please add a topic.')
  }
  if (!req.body.progress) {   // GUARD CLAUSE - no progress
    res.status(400)
    throw new Error('Please add a progress.')
  }
  if (!req.body.criteria) {   // GUARD CLAUSE - no criteria
    res.status(400)
    throw new Error('Please add a criteria.')
  }

  let actionProgress = req.body.progress.split("|planit-item|");
  let actionCriteria = req.body.criteria.split("|planit-item|");

  // send new action to database
  const action = await Action.create({
    user: req.user.id,
    topic: req.body.topic,
    progress: actionProgress,
    criteria: actionCriteria,
  })

  // send the action return json back to sender.
  res.status(200).json( action )
})

// @desc    Update action
// @route   PUT /api/actions/:id
// @access  Private
const updateAction = asyncHandler(async (req, res) => {
  const action = await Action.findById(req.params.id)

  if (!action) {
    res.status(400)
    throw new Error('Action not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  const updatedAction = await Action.findByIdAndUpdate(
    req.params.id,  
    { 
      $pull: { agrusers : req.user.id}, // REMOVE AGREE VOTE
      $push: { disusers : req.user.id}, // ADD DISAGREE VOTE
    },
    {
      new: true,
    }
  )

  res.status(200).json(updatedAction)   // return json of updated action
})

// @desc    Delete action
// @route   DELETE /api/action/:id
// @access  Private
const deleteAction = asyncHandler(async (req, res) => {
  const action = await Action.findById(req.params.id)

  if (!action) {
    res.status(400)
    throw new Error('Action not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the action user
  if (action.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await action.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getActions,
  setAction,
  updateAction,
  deleteAction,
}
