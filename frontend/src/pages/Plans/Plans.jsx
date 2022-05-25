import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import PlanInput from './../../components/PlanInput/PlanInput.jsx';
import PlanResult from './../../components/PlanResult/PlanResult.jsx';
import { toast } from 'react-toastify'                        // visible error notifications
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getPlans, resetPlanSlice } from './../../features/plans/planSlice'
import './Plans.css';

function Plans() {
  const [showNewPlan, setShowNewPlan] = useState(false);

  const navigate = useNavigate() // initialization
  const dispatch = useDispatch() // initialization

  const { user } = useSelector((state) => state.auth)      // select user values from user state
  const { plans, planIsLoading, planIsError, planMessage } = useSelector(     // select plan values from plan state
    (state) => state.plans
  )


  // called on state changes
  useEffect(() => {
    if (planIsError) {
      // console.log(planMessage)
      toast.error(planMessage) // print error to toast errors

    }
    // if(user){
      dispatch(getPlans()) // dispatch connects to the store, then retreives the plans that match the logged in user.

    // }
    // if (!user) {            // if no user, redirect to login
    //   navigate('/login') 
    // }

    
    return () => {    // reset the plans when state changes
      dispatch(resetPlanSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
    }
  }, [navigate, planIsError, planMessage, dispatch])

  if (planIsLoading) {
    return <Spinner />
  }

  function handleCreatePlanToggle(){
    if(showNewPlan){setShowNewPlan(false)}
    if(!showNewPlan){setShowNewPlan(true)}
  }

  return (
    <div className='planit-plans'>
      Plans
      <div className='planit-plans-text'>
        Every journey begins with a step.
      </div>
      <button onClick={handleCreatePlanToggle}>{showNewPlan ? "Cancel New Plan":"Create a Plan"}</button>
      { ( user ) &&
        <div className='planit-plans-in'>
          {(showNewPlan) &&
            <PlanInput />
          }

        </div>
      }
      <div className='planit-plans-my'>
        My Plans
      </div>
      <div className='planit-plans-out'>
        {plans.length > 0 ? (
          <div className='planit-plans-out-result'>
            {plans.map((plan) => 
              (plan.user === user._id)
              ?             ( <PlanResult key={plan._id} user={user} plan={plan}/> )
              : null
            )}
          </div>
        ) : (
          <h3>You have not set any plans</h3>
        )}
      </div>
    </div>
  )
}

export default Plans