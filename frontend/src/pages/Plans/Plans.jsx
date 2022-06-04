import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import PlanInput from './../../components/PlanInput/PlanInput.jsx';
import PlanResult from './../../components/PlanResult/PlanResult.jsx';
import { toast } from 'react-toastify'                        // visible error notifications
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getPlans, resetPlanSlice } from './../../features/plans/planSlice'
import './Plans.css';
import { getComments, resetCommentSlice } from '../../features/comments/commentSlice.js';

function Plans() {
  const [ showNewPlan, setShowNewPlan] = useState(false);
  const [ showMyPlans, setShowMyPlans ] = useState(false)
  const [ showSavedPlans, setShowSavedPlans ] = useState(false)

  const navigate = useNavigate() // initialization
  const dispatch = useDispatch() // initialization

  const { user } = useSelector((state) => state.auth)      // select user values from user state
  const { plans, planIsLoading, planIsError, planMessage } = useSelector(     // select plan values from plan state
    (state) => state.plans
  )
  const { comments, commentIsLoading, commentIsError, commentMessage } = useSelector(     // select plan values from plan state
    (state) => state.comments
  )

  // called on state changes
  useEffect(() => {
    if (planIsError || commentIsError) {
      // console.log(planMessage)
      toast.error(planMessage) // print error to toast errors
      toast.error(commentMessage) // print error to toast errors

    }
    // if(user){
      dispatch(getPlans()) // dispatch connects to the store, then retreives the plans that match the logged in user.
      dispatch(getComments()) // dispatch connects to the store, then retreives the plans that match the logged in user.

    // }
    if (!user) {            // if no user, redirect to login
      navigate('/login') 
    }

    
    return () => {    // reset the plans when state changes
      dispatch(resetPlanSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
      dispatch(resetCommentSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
    }
  }, [navigate, planIsError, planMessage, dispatch, user, commentIsError, commentMessage])

  if ( planIsLoading || commentIsLoading ) {
    return <Spinner />
  }

  function handleCreatePlanToggle(){
    if(showNewPlan){setShowNewPlan(false)}
    else if(!showNewPlan){setShowNewPlan(true)}
  }
  function handleMyPlansToggle(){
    if(showMyPlans){setShowMyPlans(false)}
    else if(!showMyPlans){setShowMyPlans(true)}
  }
  function handleSavedPlansToggle(){
    if(showSavedPlans){setShowSavedPlans(false)}
    else if(!showSavedPlans){setShowSavedPlans(true)}
  }

  return (
    <div className='planit-plans'>
      Plans
      <div className='planit-plans-text'>
        Every journey begins with a step.
      </div>
      <div  className='planit-plans-create' >
        
        <div onClick={handleCreatePlanToggle} className='planit-plans-create-text'>
          {
            showNewPlan ? "Cancel Plan":"Create Plan"
          }
        
        </div>
        { ( user ) &&
          <div className='planit-plans-in'>
            {(showNewPlan) &&
              <PlanInput />
            }

          </div>
        }
      </div>

      <div className='planit-plans-my'>
        <div onClick={handleMyPlansToggle} className="planit-plans-my-text">
          My Plans
        </div>
      
        { showMyPlans &&
          <div className='planit-plans-my-out'>
            {plans.length > 0 ? (
              <div className='planit-plans-my-out-result'>
                {plans.map((plan) => 
                  (plan.user === user._id)
                  ? ( <PlanResult key={plan._id} user={user} plan={plan} comments={comments}/> )
                  : null
                )}
              </div>
            ) : (
              <h3>You have not set any plans</h3>
            )}
          </div>
        }
      </div>
      <div className='planit-plans-saved'>
        <div onClick={handleSavedPlansToggle} className="planit-plans-saved-text">
          Saved Plans
        </div>
        { showSavedPlans &&
          <div className='planit-plans-saved-out'>
            {plans.length > 0 ? (
              <div className='planit-plans-saved-out-result'>
                {plans.map((plan) => 
                  ( plan.followers.includes( user._id ) )
                  ? ( <PlanResult key={plan._id} user={user} plan={plan} comments={comments}/> )
                  : null
                )}
              </div>
            ) : (
              <h3>You have not set any plans</h3>
            )}
          </div>
        }
      </div>
    </div>
  )
}

export default Plans