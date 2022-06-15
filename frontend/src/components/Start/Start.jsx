import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import Spinner from '../Spinner/Spinner.jsx'
import { getPlans, resetPlanSlice, createPlan, updatePlan, deletePlan } from '../../features/plans/planSlice'
import { getGoals, resetGoalSlice, createGoal, updateGoal, deleteGoal } from '../../features/goals/goalSlice'
import { getComments, resetCommentSlice, createComment, updateComment } from '../../features/comments/commentSlice'
import { getMyData, resetAuthSlice } from '../../features/auth/authSlice'
import PlanResult from '../PlanResult/PlanResult.jsx'
import LoginView from '../LoginView/LoginView.jsx'
import BuildPlanObjectArray from '../BuildPlanitObjectArray.js'

import PlanPreview from '../PlanPreview/PlanPreview.jsx'
import { toast } from 'react-toastify'                        // visible error notifications
import './Start.css';


function Start() {
    const [ findPlan, setFindPlan ] = useState("");
    const [ loginView, setLoginView ] = useState(false);
    const [ outputPlans, setOutputPlans ] = useState([]);
    const [ renders, setRenders ] = useState(0);
    
    const [ planObjectArray, setPlanObjectArray ] = useState([]);

    const [plan, setPlan] = useState('')
    const [goal, setGoal] = useState('')



    // const navigate = useNavigate() // initialization
    const dispatch = useDispatch() // initialization
  
    // const { user } = useSelector((state) => state.auth)      // select user values from user state
    const { plans, planIsLoading, planIsError, planMessage } = useSelector(     // select goal values from goal state
        (state) => state.plans
    )
    const { goals, goalIsLoading, goalIsError, goalMessage } = useSelector(     // select goal values from goal state
        (state) => state.goals
    )
    const { comments, commentIsLoading, commentIsError, commentMessage } = useSelector(     // select goal values from goal state
        (state) => state.comments
    )
    const { user, authIsLoading, authIsError, authMessage } = useSelector(
        (state) => state.auth
    )


    // Scroll to the top on render
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    // called on state changes
    useEffect(() => {
        if (planIsError) {
            toast.error(planMessage) // print error to toast errors
        }
        if (commentIsError) {
            toast.error(commentMessage) // print error to toast errors
        }
        if (authIsError) {
            toast.error(authMessage) // print error to toast errors
        }
        if (goalIsError) {
            toast.error(goalMessage) // print error to toast errors
        }

        // if( ( !user ) && ( renders === 0 ) ){
        //     if(loginView === false){setLoginView( true )}
        //     setRenders( renders + 1 )
        // }


        dispatch(getPlans()) // dispatch connects to the store, then retreives the plans that match the logged in user.
        dispatch(getGoals()) // dispatch connects to the store, then retreives the plans that match the logged in user.
        dispatch(getComments()) // dispatch connects to the store, then retreives the plans that match the logged in user.
        // dispatch(getMyData()) // dispatch connects to the store, then retreives the profile data that matches the logged in user.





        return () => {    // reset the plans when state changes
            dispatch(resetPlanSlice()) // dispatch connects to the store, then reset state values( planMessage, planisloading, planiserror, and planissuccess )
            dispatch(resetCommentSlice()) // dispatch connects to the store, then reset state values( commentMessage, commentisloading, commentiserror, and commentissuccess )
            dispatch(resetGoalSlice()) // dispatch connects to the store, then reset state values( commentMessage, commentisloading, commentiserror, and commentissuccess )
            dispatch(resetAuthSlice()) // dispatch connects to the store, then reset state values( authMessage, authisloading, authiserror, and authissuccess )

        }
    }, [authIsError, authMessage, commentIsError, commentMessage, dispatch, goalIsError, goalMessage, planIsError, planMessage])

    useEffect(() => {
        setPlanObjectArray( BuildPlanObjectArray( goals, plans, comments )[1] )
    }, [comments, goals, plans])

    useEffect(() => {
        function handleOutputPlans(planObjectArray){
            if(findPlan===''){return;} // No search guard clause
            if (!planObjectArray || planObjectArray.length===[]) {return;} // guard clause


            var outputArray = [];
            planObjectArray.forEach(( plan, planIndex ) => {
                var includedInPlan = false;
                plan[3].forEach(arrayOfPlanStepProperties => {   // for each plan of a plan
                    if(arrayOfPlanStepProperties[1].toUpperCase().includes(findPlan.toUpperCase())){ // check if the search input is in the plan goal
                        includedInPlan = true;
                    }
                })
                if((findPlan!=="") && ( (includedInPlan) || planObjectArray[2][1].toUpperCase().includes(findPlan.toUpperCase()) )){ // check if the search input is in the plan plan
                    console.log(planObjectArray[planIndex])
                    const outputElement = <PlanResult 
                        key = {"planresult"+plan[0]} 
                        importPlanArray = {plan}
                    />
                    outputArray.push( outputElement )
                }
            });
            // console.log(outputPlans)
            setOutputPlans(outputArray);
        }
        handleOutputPlans(planObjectArray)

    }, [findPlan, planObjectArray, plans])

    // RUNS ON CREATE PLAN -- sends the new plan and goal text to the database
    const onPlanSubmit = (e) => {
        e.preventDefault()
        dispatch(createPlan({ plan,goal }))   // dispatch connects to the store, then creates a plan with text input
        setPlan('')                      // empty plan field
        setGoal('')                      // empty goal field
    }




    // Shows loading animation while getting plans + comments
    if (authIsLoading) {
        return <Spinner />
    }


    



    return (<>
        { loginView &&
            < LoginView click={setLoginView} />
        }
        <div className='planit-dashboard-start'>
            <div className='planit-dashboard-start-find'>
                <div className='planit-dashboard-start-find-text'>
                    My goal is to...
                </div>
                <div className='planit-dashboard-start-find-space'>
                    <input 
                        type="text" 
                        className='planit-dashboard-start-find-input'
                        placeholder='( Enter your goal )'
                        // value={findPlan}
                        onChange={(e) => setFindPlan(e.target.value)}
                    />
                    {/* <div className='planit-dashboard-start-find-but'>
                        <a href="/">
                            <button className='planit-dashboard-start-find-but-button'>
                                <img id='planit-dashboard-start-find-logo-but-img' src={HeaderLogo} alt='website logo'/>
                                Search
                            </button>
                        </a>
                    </div> */}
                </div>
            </div>
            <div className='planit-dashboard-start-goals'>
                {(findPlan !== "") && 
                    <div >{(outputPlans.length !== 0) ? (
                        <div >
                            {outputPlans}
                        </div>
                    ):<>
                    {(user) ? 
                        <div className='planit-dashboard-start-goals-plan'>
                            <h4>
                                {findPlan}
                            </h4>
                            <form onSubmit={onPlanSubmit}>
                                <h4 className='planit-dashboard-start-goals-sp'>
                                    <textarea
                                        type='plan'
                                        name='plan'
                                        className='planit-dashboard-start-goals-plan-sp-input' 
                                        placeholder='Enter plan' 
                                        value={plan}
                                        onChange={(e) => setPlan(e.target.value)}
                                    /><br/>
                                    <button type='submit' >
                                        Create Plan
                                    </button>
                                </h4>
                            </form>
                        </div>
                        :null
                    }
                    </>

                    }</div>
                }
            </div>
        </div>
    </>)
}

export default Start