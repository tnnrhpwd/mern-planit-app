const mongoose = require('mongoose') // MVC library - used to communicate with MongoDB

// Schema of each plan ( object attributes ) => exported to planController ( object methods/functions )  => exported to planRoutes
const planSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    plan: {
      type: String,
      required: [true, 'Please add a plan value'],
    },
    goal: {
      type: String,
      required: [true, 'Please add a goal value'],
    },
    agrusers: {
      type: mongoose.Schema.Types.Array,
      // required: [true, 'Please add a goal value'],
    },
    disusers: {
      type: mongoose.Schema.Types.Array,
      // required: [true, 'Please add a goal value'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Plan', planSchema) // exported to controller to create callback functions, which are executed from routes
