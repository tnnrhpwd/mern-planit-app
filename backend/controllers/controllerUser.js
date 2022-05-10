// This file contains the functions that deal with the User objects( schema imported from Models)  => Exported to Routes(listens + calls these methods on requests)
const jwt = require('jsonwebtoken') //import json web tokens to send to user on login -- this token will be read when user request user details -- confirms same user
const bcrypt = require('bcryptjs')  // used to hash passwords
const asyncHandler = require('express-async-handler') // sends the errors to the errorhandler
const User = require('../models/userModel') // import user schema

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if email exists
  const emailExists = await User.findOne({ email })

  if (emailExists) {
    res.status(400)
    throw new Error('Email already exists')
  }

  // Check if username exists
  const usernameExists = await User.findOne({ username })

  if (usernameExists) {
    res.status(400)
    throw new Error('Username already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  })

  if (user) { // if user successfully created, send JSON web token back to user
    res.status(201).json({
      // _id: user.id,
      // name: user.name,
      // email: user.email, // only need to send token back
      token: generateToken(user._id),   //uses JWT secret 
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {  // if decrypted password equals user password input, send token back to user.
    res.json({
      // _id: user.id,
      // username: user.username,
      // email: user.email,            // only need to send token back
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')  // showed in frontend 
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user) // output user details after middleware
})

// Generate JWT -- sent to user after register + sign in. User stores this token and send it back inside the header on following requests.
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {  // exported to routes
  registerUser,
  loginUser,
  getMe,
}
