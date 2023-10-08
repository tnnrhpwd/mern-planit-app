import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import PlanResult from './../../components/PlanResult/PlanResult.jsx';
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getDatas, resetDataSlice } from './../../features/data/dataSlice'
import { toast } from 'react-toastify'    


function MiddleDashboard() {
    const navigate = useNavigate() // initialization
    const dispatch = useDispatch() // initialization
  
    const { user, data, dataIsLoading, dataIsError, dataMessage } = useSelector(     // select plan values from plan state
        (state) => state.data
    )

    // called on state changes
    useEffect(() => {
        if (dataIsError) {
        console.log(dataMessage)
        }
    
        if (!user) {            // if no user, redirect to login
          navigate('/login') 
        }
    
        // dispatch(getDatas()) // dispatch connects to the store, then retreives the plans that match the logged in user.
    
        return () => {    // reset the plans when state changes
        dispatch(resetDataSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
        }
    }, [navigate, dispatch, dataIsError, user, dataMessage])

    if (dataIsLoading) {
        return <Spinner />
    }

    function callData() {
        console.log("run get data")
        dispatch(getDatas())
        
    } 

    return (
        <div className='planit-dashboard-popular-mid'>
            Send message to our servers, and we will give you some of our data in return.
            <div className='planit-dashboard-popular-left-plans'>
                <button onClick={callData} id='planit-dashboard-popular-left-plans-middledashboard-button'>Get Data</button>
                {/* {plans.length > 0 ? (
                    <div className='planit-plans-out-result'>
                    {plans.map((plan) => (
                        <PlanResult key={plan._id} plan={plan} />
                    ))}
                    </div>
                ) : (
                    <h3>You have not set any plans</h3>
                )} */}
            </div>
        </div>
    )
}

export default MiddleDashboard

