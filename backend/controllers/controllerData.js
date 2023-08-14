// This file contains the functions that deal with the User objects( schema imported from Models)  => Exported to Routes(listens + calls these methods on requests)
const jwt = require('jsonwebtoken') //import json web tokens to send to user on login -- this token will be read when user request user details -- confirms same user
const bcrypt = require('bcryptjs')  // used to hash passwords
const asyncHandler = require('express-async-handler') // sends the errors to the errorhandler

const Data = require('../models/dataModel')

// @desc    Get Data
// @route   GET /api/data
// @access  Private
const getData = asyncHandler(async (req, res) => {
  // const data = await data.find({ data: req.user.id }) //  where the request user matches the data user
  const datas = await Data.find() //  Get all data

  res.status(200).json(Data) // returns json of data
})

// @desc    Set data
// @route   POST /api/data
// @access  Private
const setData = asyncHandler(async (req, res) => {
  if (!req.body.data) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const datas = await Data.create({
    data: req.body.data,
  })
  

  res.status(200).json(Data)
})

// @desc    Update Data
// @route   PUT /api/data/:id
// @access  Private
const updateData = asyncHandler(async (req, res) => {
  const dataHolder = await Data.findById(req.params.id)

  if (!dataHolder) {
    res.status(400)
    throw new Error('Comment not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the comment user
  if (dataHolder.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedComment = await Data.findByIdAndUpdate(req.params.id,  { $push: req.body}, {
    new: true,
  })

  res.status(200).json(updatedComment)   // return json of updated comment
})

// @desc    Delete data
// @route   DELETE /api/data/:id
// @access  Private
const deleteData = asyncHandler(async (req, res) => {
  const dataHolder = await Data.findById(req.params.id)

  if (!dataHolder) {
    res.status(400)
    throw new Error('Comment not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the comment user
  if (dataHolder.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await Data.remove()

  res.status(200).json({ id: req.params.id })
})

// @desc    Register new user
// @route   POST /api/data/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if email exists
  const emailExists = await Data.findOne({ data: { $regex: `${email}\\s\\|` } })

  if (emailExists) {
    res.status(400)
    throw new Error("This email is already registered")
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const data = await Data.create({
    data:email+" | "+hashedPassword,
  })

  if (data) { // if user data successfully created, send JSON web token back to user
    res.status(201).json({
      _id: data.id,
      email, 
      token: generateToken(data._id),   //uses JWT secret 
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/data/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await Data.findOne({ data: { $regex: `${email}\\s\\|` } })
  if (user === null){
    res.status(400)
    throw new Error("Invalid credentials")  // showed in frontend 
  }
  const userPassword = user.data.substring(user.data.indexOf('|') + 2);

  if (user && (await bcrypt.compare(password, userPassword))) {  // if decrypted password equals user password input, send token back to user.
    res.json({
      _id: user.id,
      email: email,            // only need to send token back
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid credentials")  // showed in frontend 
  }
})

// Generate JWT -- sent to user after register + sign in. User stores this token and send it back inside the header on following requests.
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  getData,
  setData,
  updateData,
  deleteData,
  registerUser,
  loginUser,
}