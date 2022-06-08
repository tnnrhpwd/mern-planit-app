import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import GoalInput from './../../components/GoalInput/GoalInput.jsx';
import GoalResult from './../../components/GoalResult/GoalResult.jsx';
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getGoals, resetGoalSlice } from './../../features/goals/goalSlice'
import { toast } from 'react-toastify'                        // visible error notifications
import './Goals.css';

function Goals() {

  const navigate = useNavigate() // initialization
  const dispatch = useDispatch() // initialization

  const { user } = useSelector((state) => state.auth)      // select user values from user state
  const { goals, goalIsLoading, goalIsError, goalMessage } = useSelector(     // select goal values from goal state
    (state) => state.goals
  )


  // called on state changes
  useEffect(() => {
    if (goalIsError) {
      console.log(goalMessage)
      toast.error(goalMessage, { autoClose: 1000 });
    }
    // if(user){
      dispatch(getGoals()) // dispatch connects to the store, then retreives the goals that match the logged in user.

    // }
    if (!user) {            // if no user, redirect to login
      navigate('/login') 
    }

    
    return () => {    // reset the goals when state changes
      dispatch(resetGoalSlice()) // dispatch connects to the store, then reset state values( goalMessage, isloading, iserror, and issuccess )
    }
  }, [navigate, goalIsError, goalMessage, dispatch, user])

  if (goalIsLoading) {
    return <Spinner />
  }

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
            {goals.map((goal) => (
              <GoalResult key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </div>
    </div>
  )
}

export default Goals