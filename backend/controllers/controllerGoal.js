// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = (req, res) => {
    res.status(200).json({  })
}




module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
  }
  