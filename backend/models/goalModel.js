const mongoose = require('mongoose') // MVC library - used to communicate with MongoDB

// Schema of each goal ( object attributes ) => exported to goalController ( object methods/functions )  => exported to goalRoutes
const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Goal', goalSchema) // exported to controller to create callback functions, which are executed from routes
