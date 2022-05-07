import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import GoalInput from './../../components/GoalInput/GoalInput.jsx';
import GoalResult from './../../components/GoalResult/GoalResult.jsx';
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getGoals, resetGoalSlice } from './../../features/goals/goalSlice'
import './Goals.css';

function Goals() {

  const navigate = useNavigate() // initialization
  const dispatch = useDispatch() // initialization

  // const { user } = useSelector((state) => state.auth)      // select user values from user state
  const { goals, isLoading, isError, message } = useSelector(     // select goal values from goal state
    (state) => state.goals
  )


  // called on state changes
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    // if(user){
      dispatch(getGoals()) // dispatch connects to the store, then retreives the goals that match the logged in user.

    // }
    // if (!user) {            // if no user, redirect to login
    //   navigate('/login') 
    // }

    
    return () => {    // reset the goals when state changes
      dispatch(resetGoalSlice()) // dispatch connects to the store, then reset state values( message, isloading, iserror, and issuccess )
    }
  }, [navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='planit-goals'>
      Goals
      <div className='planit-goals-text'>
        Every journey begins with a step.
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