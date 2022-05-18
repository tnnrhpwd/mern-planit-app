import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import PlanResult from './../../components/PlanResult/PlanResult.jsx';
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getPlans, resetPlanSlice } from './../../features/plans/planSlice'

function MiddleDashboard() {
    const navigate = useNavigate() // initialization
    const dispatch = useDispatch() // initialization
  
    const { user } = useSelector((state) => state.auth)      // select user values from user state
    const { plans, planIsLoading, planIsError, planMessage } = useSelector(     // select plan values from plan state
        (state) => state.plans
    )
  
    // called on state changes
    useEffect(() => {
        if (planIsError) {
        console.log(planMessage)
        }
    
        // if (!user) {            // if no user, redirect to login
        //   navigate('/login') 
        // }
    
        dispatch(getPlans()) // dispatch connects to the store, then retreives the plans that match the logged in user.
    
        return () => {    // reset the plans when state changes
        dispatch(resetPlanSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
        }
    }, [user, navigate, planIsError, planMessage, dispatch])

    if (planIsLoading) {
        return <Spinner />
    }

    return (
        <div className='planit-dashboard-popular-mid'>
            Popular Plans
            <div className='planit-dashboard-popular-left-plans'>
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

export default MiddleDashboard

