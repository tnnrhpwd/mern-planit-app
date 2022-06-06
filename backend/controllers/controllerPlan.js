// This file contains the functions that deal with the Plan objects( schema imported from Models) => Exported to Routes
const asyncHandler = require('express-async-handler')// sends the errors to the errorhandler

const Plan = require('../models/planModel')

// @desc    Get plans
// @route   GET /api/plans
// @access  Private
const getPlans = asyncHandler(async (req, res) => {
  // const plans = await Plan.find({ user: req.user.id }) //  where the request user matches the plan user
  const plans = await Plan.find() //  Get all users' plans


  res.status(200).json(plans) // returns json of plans
})

// @desc    Set plan
// @route   POST /api/plans
// @access  Private
const setPlan = asyncHandler(async (req, res) => {
  if (!req.body.plan) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const planArray = req.body.plan.split("|planit-item|")

  const plan = await Plan.create({
    goal: req.body.goal,
    plan: planArray,
    user: req.user.id,
  })
  

  res.status(200).json(plan)
})

// @desc    Update plan
// @route   PUT /api/plans/:id
// @access  Private
const updatePlan = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.params.id)

  if (!plan) {
    res.status(400)
    throw new Error('Plan not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (!req.body.type){
    res.status(401)
    throw new Error('Vote type not found')
  }


  var updatedPlan = "";

  switch (new String(req.body.type).valueOf()) {
    case new String("agree").valueOf():
    case new String("disagree").valueOf():
      // IF USER HAS ALREADY VOTED AGREE 
      if (plan.agrusers.includes(req.user.id)){
        // IF JUST VOTED AGREE
        if (new String(req.body.type).valueOf() === new String("agree").valueOf()){
          updatedPlan = await Plan.findByIdAndUpdate(
            req.params.id,  
            { $pull: { agrusers : req.user.id}}, // REMOVE AGREE VOTE
            {
              new: true,
            }
          )
        }
        // IF JUST VOTED DISAGREE
        if (new String(req.body.type).valueOf() === new String("disagree").valueOf()){
          updatedPlan = await Plan.findByIdAndUpdate(
            req.params.id,  
            { 
              $pull: { agrusers : req.user.id}, // REMOVE AGREE VOTE
              $push: { disusers : req.user.id}, // ADD DISAGREE VOTE
            },
            {
              new: true,
            }
          )
        }
      }
      // IF USER HAS ALREADY VOTED DISAGREE 
      if (plan.disusers.includes(req.user.id)){
        // IF JUST VOTED AGREE
        if (new String(req.body.type).valueOf() === new String("agree").valueOf()){
          updatedPlan = await Plan.findByIdAndUpdate(
            req.params.id,  
            {
              $pull: { disusers : req.user.id}, // REMOVE DISAGREE VOTE
              $push: { agrusers : req.user.id}, // ADD AGREE VOTE
            },
            {
              new: true,
            }
          )
        }
        // IF JUST VOTED DISAGREE
        if (new String(req.body.type).valueOf() === new String("disagree").valueOf()){
          updatedPlan = await Plan.findByIdAndUpdate(
            req.params.id,  
            { 
              $pull: { disusers : req.user.id}, // REMOVE DISAGREE VOTE
            },
            {
              new: true,
            }
          )
        }
      }
      // IF USER HAS NOT ALREADY VOTED 
      if (!plan.agrusers.includes(req.user.id) && !plan.disusers.includes(req.user.id)){
        // IF JUST VOTED AGREE
        if (new String(req.body.type).valueOf() === new String("agree").valueOf()){
          updatedPlan = await Plan.findByIdAndUpdate(
            req.params.id,  
            { $push: { agrusers : req.user.id}}, // ADD AGREE VOTE
            {
              new: true,
            }
          )
        }
        // IF JUST VOTED DISAGREE
        if (new String(req.body.type).valueOf() === new String("disagree").valueOf()){
          updatedPlan = await Plan.findByIdAndUpdate(
            req.params.id,  
            { $push: { disusers : req.user.id}}, // ADD AGREE VOTE
            {
              new: true,
            }
          )
        }
      }  

      break;
      
    case new String("favorite").valueOf():
      // IF USER HAS NOT FAVORITED && JUST FAVORITED
      if (( !plan.followers.includes(req.user.id) )){
        updatedPlan = await Plan.findByIdAndUpdate(
          req.params.id,  
          { $push: { followers : req.user.id}}, // ADD FAVORITE
          {
            new: true,
          }
        )
      }  
      break;

    case new String("unfavorite").valueOf():
      // IF USER HAS ALREADY FAVORITED && JUST UNFAVORITED
      if (( plan.followers.includes(req.user.id) )){
        updatedPlan = await Plan.findByIdAndUpdate(
          req.params.id,  
          { $pull: { followers : req.user.id}}, // REMOVE FAVORITE
          {
            new: true,
          }
        )  
      }  
      break;

    default:
      break;
  }






  // If request was not a vote, Make sure the logged in user matches the plan user
  if ( updatedPlan === "" ){
    if (plan.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  }


  res.status(200).json(updatedPlan)   // return json of updated plan
})

// @desc    Delete plan
// @route   DELETE /api/plan/:id
// @access  Private
const deletePlan = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.params.id)

  if (!plan) {
    res.status(400)
    throw new Error('Plan not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the plan user
  if (plan.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await plan.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getPlans,
  setPlan,
  updatePlan,
  deletePlan,
}
