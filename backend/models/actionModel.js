const mongoose = require('mongoose'); // MVC library - used to communicate with MongoDB

// Schema of each action ( object attributes ) => exported to actionController ( object methods/functions )  => exported to actionRoutes
const actionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    data: {
      type: mongoose.Schema.Types.Array,
    }, 
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Action', actionSchema); // exported to controller to create callback functions, which are executed from routes
