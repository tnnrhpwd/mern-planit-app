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

import PlanPreview from '../PlanPreview/PlanPreview.jsx'
import { toast } from 'react-toastify'                        // visible error notifications
import './Start.css';


function Start() {
    const [ findPlan, setFindPlan ] = useState("");
    const [ loginView, setLoginView ] = useState(false);
    const [ outputPlans, setOutputPlans ] = useState([]);
    const [ renders, setRenders ] = useState(0);
    
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

    // RUNS ON INPUT FIELD CHANGE -- shows search suggestions
    useEffect(() => {

        // function handlePreviewOpen(planObject){
        //     var scrollheight = window.scrollY;
        //     setOutView(
        //         <PlanPreview 
        //             user = {user}
        //             key = "PlanPreviewKey"
        //             screenY = {scrollheight} 
        //             handlePlanPreviewClose = {handlePreviewClose} 
        //             planIdentity = {planObject}
        //             planIDComments = {comments}
        //         />
        //     )
        // }
        
        // if (!findPlan){return}   // guard clause - no search



        function handleOutputPlans(){
            if(findPlan===''){return;} // No search guard clause

            function getGoalObjectFromObjectID(goalObjectIDString){
                return goals.find( x => x._id === goalObjectIDString )
            }

            var outputArray = [];
            plans.forEach(( plan, i ) => {
                var includedInPlan = false;
                const planObject = getGoalObjectFromObjectID(plan.goal) // get the name of the plan
                plan.plan.forEach(stringOfGoalID => {   // for each plan of a plan
                    const goalObject = getGoalObjectFromObjectID(stringOfGoalID) // get the name of each plan of the plan
                    if (!goalObject) {return} // guard clause
                    if(goalObject.goal.toUpperCase().includes(findPlan.toUpperCase())){ // check if the search input is in the plan goal
                        includedInPlan = true;
                    }
                })
                
                if (!planObject) {return} // guard clause
                if((findPlan!=="") && ( (includedInPlan) || planObject.goal.toUpperCase().includes(findPlan.toUpperCase()) )){ // check if the search input is in the plan plan
                    outputArray.push(
                        <PlanResult 
                            key={plan._id} 
                            plan={plan._id} 
                        />
                    )
                }
            });
            // console.log(outputPlans)
            setOutputPlans(outputArray);
        }
        
        // console.log(outputPlans)
        console.log('findPlan'+findPlan)

        // if (!(outputPlans.length>0)){
        handleOutputPlans()

        // }

    }, [plans, goals, findPlan])

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

        if( ( !user ) && ( renders === 0 ) ){
            if(loginView === false){setLoginView( true )}
            setRenders( renders + 1 )
        }


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
    }, [planIsError, planMessage, dispatch, commentIsError, commentMessage, authIsError, authMessage, user, renders, loginView, goalIsError, goalMessage])


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