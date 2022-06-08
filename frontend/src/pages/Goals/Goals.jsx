import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import GoalInput from './../../components/GoalInput/GoalInput.jsx';
import GoalResult from './../../components/GoalResult/GoalResult.jsx';
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getPlans, resetPlanSlice } from './../../features/plans/planSlice'
import { getGoals, resetGoalSlice } from './../../features/goals/goalSlice'
import { getComments, resetCommentSlice } from '../../features/comments/commentSlice.js';
import { toast } from 'react-toastify'                        // visible error notifications
import './Goals.css';

function Goals() {
  // const [ outputGoals, setOutputGoals ] = useState(null)

  const navigate = useNavigate() // initialization
  const dispatch = useDispatch() // initialization

  const { user } = useSelector((state) => state.auth)      // select user values from user state
  const { goals, goalIsLoading, goalIsError, goalMessage } = useSelector(     // select goal values from goal state
    (state) => state.goals
  )
  const { comments, commentIsLoading, commentIsError, commentMessage } = useSelector(     // select plan values from plan state
    (state) => state.comments
  )
  const { plans, planIsLoading, planIsError, planMessage } = useSelector(     // select plan values from plan state
  (state) => state.plans
)

  // called on state changes
  useEffect(() => {
    if (goalIsError || commentIsError || planIsError) {
      console.log(goalMessage)
      toast.error(commentMessage, { autoClose: 1000 });
      toast.error(goalMessage, { autoClose: 1000 });
    }

    dispatch(getComments()) // dispatch connects to the store, then retreives the comments.
    dispatch(getGoals()) // dispatch connects to the store, then retreives the goals.
    dispatch(getPlans()) // dispatch connects to the store, then retreives the goals.

    if (!user) {            // if no user, redirect to login
      navigate('/login') 
    }

    // if(goals && plans){
    //   var outputGoalsArray = [];
    //   goals.forEach( selectGoal => {
    //     outputGoalsArray.push(selectGoal)
    //   });
    //   plans.forEach( selectGoal => {
    //     outputGoalsArray.push(selectGoal)
    //   });
    //   setOutputGoals(outputGoalsArray)
    // }

    
    return () => {    // reset the goals when state changes
      dispatch(resetGoalSlice()) // dispatch connects to the store, then reset state values( goalMessage, isloading, iserror, and issuccess )
      dispatch(resetCommentSlice()) // dispatch connects to the store, then reset state values( goalMessage, isloading, iserror, and issuccess )
    }
  }, [navigate, goalIsError, goalMessage, dispatch, user, commentIsError, commentMessage, goals, plans, planIsError])


  return (
    <div className='planit-goals'>
      Goals
      <div className='planit-goals-text'>
        Every journey begins with a step.
        <br/><br/> Create plans for other peoples' goals, or get their input on your goals.
        <br/> 
      </div>
      <div className='planit-goals-in'>
        <GoalInput />
      </div>
      All Goals
      <div className='planit-goals-out'>
        {goals.length > 0 ? (
          <div className='planit-goals-out-result'>
            {goals.map((goal) => {
              return (<GoalResult key={goal._id} goal={goal} user={user} comments={comments} />)
            })}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </div>
    </div>
  )
}

export default Goals