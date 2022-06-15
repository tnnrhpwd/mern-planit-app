const mongoose = require('mongoose') // MVC library - used to communicate with MongoDB

// Schema of each plan ( object attributes ) => exported to commentController ( object methods/functions )  => exported to commentRoutes
const commentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        comment: {
            type: String,
            required: [true, 'Please add a plan value'],
        },
        topic: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'No plan was referenced'],
        },
        agrusers: {
            type: mongoose.Schema.Types.Array,
        },
        disusers: {
          type: mongoose.Schema.Types.Array,
        },
    },
    {
      timestamps: true,
    }
)

module.exports = mongoose.model('Comment', commentSchema) // exported to controller to create callback functions, which are executed from routes
