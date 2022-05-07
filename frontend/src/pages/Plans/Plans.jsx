import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import PlanInput from './../../components/PlanInput/PlanInput.jsx';
import PlanResult from './../../components/PlanResult/PlanResult.jsx';
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getPlans, resetPlanSlice } from './../../features/plans/planSlice'
import './Plans.css';

function Plans() {

  const navigate = useNavigate() // initialization
  const dispatch = useDispatch() // initialization

  // const { user } = useSelector((state) => state.auth)      // select user values from user state
  const { plans, isLoading, isError, message } = useSelector(     // select plan values from plan state
    (state) => state.plans
  )


  // called on state changes
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    // if(user){
      dispatch(getPlans()) // dispatch connects to the store, then retreives the plans that match the logged in user.

    // }
    // if (!user) {            // if no user, redirect to login
    //   navigate('/login') 
    // }

    
    return () => {    // reset the plans when state changes
      dispatch(resetPlanSlice()) // dispatch connects to the store, then reset state values( message, isloading, iserror, and issuccess )
    }
  }, [navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }


  return (
    <div className='planit-plans'>
      Plans
      <div className='planit-plans-text'>
        Every journey begins with a step.
      </div>
      <div className='planit-plans-in'>
        <PlanInput />
      </div>
      All Plans
      <div className='planit-plans-out'>
        {plans.length > 0 ? (
          <div className='planit-plans-out-result'>
            {plans.map((plan) => (
              <PlanResult key={plan._id} plan={plan} />
            ))}
          </div>
        ) : (
          <h3>You have not set any plans</h3>
        )}
      </div>
    </div>
  )
}

export default Plans