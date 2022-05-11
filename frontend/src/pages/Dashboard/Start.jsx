import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getGoals, resetGoalSlice } from './../../features/goals/goalSlice'




function Start() {
    const [ findGoal, setFindGoal ] = useState("");
    const [ outView, setOutView ] = useState(false);
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
                        <button className='planit-dashboard-start-goals-result' onClick={() => setFindGoal(goal.text)}>{goal.text}</button>
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

                <div className='planit-dashboard-start-find-space'>
                    <input 
                        type="text" 
                        className='planit-dashboard-start-find-input'
                        placeholder='( Enter your goal )'
                        value={findGoal}
                        onChange={(e) => setFindGoal(e.target.value)}
                    />
                    <div className='planit-dashboard-start-find-but'>
                        {/* <a href="/"> */}
                            <button className='planit-dashboard-start-find-but-button'>
                                {/* <img id='planit-dashboard-start-find-logo-but-img' src={HeaderLogo} alt='website logo'/> */}
                                Search
                            </button>
                        {/* </a> */}
                    </div>
                </div>

            </div>

            <div className='planit-dashboard-start-goals'>
                {(goals.length !== 0) ? (
                    <div>
                        {outputGoals}
                    </div>
                ):
                    <div>
                        Create a new goal!
                    </div>
                }
            </div>


        </div>
    )
}

export default Start