import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getGoals, resetGoalSlice } from './../../features/goals/goalSlice'

function Start() {
    const [ findGoal, setFindGoal ] = useState("");
    const [ outputGoals, setOutputGoals ] = useState(null);

    const navigate = useNavigate() // initialization
    const dispatch = useDispatch() // initialization
  
    // const { user } = useSelector((state) => state.auth)      // select user values from user state
    const { goals, isLoading, isError, message } = useSelector(     // select goal values from goal state
        (state) => state.goals
    )




    useEffect(() => {
        function handleOutputGoals(){
            if(findGoal===null){return;} // No search guard clause
            var outputArray = [];
    
            goals.forEach(( goal, i ) => {
                if((findGoal!=="") && (goal.text.toUpperCase().includes(findGoal.toUpperCase()))){
                    outputArray.push(<>
                        <h2>{goal.text}</h2>
                    </>)
                }
            });
            setOutputGoals(outputArray);
        }

        handleOutputGoals()
    }, [findGoal, goals])

    // called on state changes
    useEffect(() => {
        if (isError) {
        console.log(message)
        }

        dispatch(getGoals()) // dispatch connects to the store, then retreives the goals that match the logged in user.
        
        return () => {    // reset the goals when state changes
            dispatch(resetGoalSlice()) // dispatch connects to the store, then reset state values( message, isloading, iserror, and issuccess )
        }
    }, [navigate, isError, message, dispatch])

    if (isLoading) {
        return <Spinner />
    }

  return (
    <div className='planit-dashboard-start'>
        <div className='planit-dashboard-start-find'>
            <div className='planit-dashboard-start-find-text'>
                My goal is to 
            </div>

            <input 
                type="text" 
                className='planit-dashboard-start-find-input'
                placeholder='( Enter your goal )'
                value={findGoal}
                onChange={(e) => setFindGoal(e.target.value)}
            />
        </div>
        <div className='planit-dashboard-start-goals'>
            {goals.length && (
            <div className='planit-goals-out-result'>
                {outputGoals}
            </div>
            )}
        </div>
    </div>
  )
}

export default Start