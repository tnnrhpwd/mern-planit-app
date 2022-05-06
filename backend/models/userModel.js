const mongoose = require('mongoose'); // MVC library - used to communicate with MongoDB

// Schema of each user ( object attributes ) => exported to userController ( object methods/functions )  => exported to userRoutes
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a username'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema); // exported to controller to create callback functions, which are executed from routes
