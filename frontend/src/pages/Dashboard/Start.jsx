import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getPlans, resetPlanSlice, createPlan, updatePlan } from './../../features/plans/planSlice'
import PlanPreview from '../../components/PlanPreview/PlanPreview.jsx'
import { toast } from 'react-toastify'                        // visible error notifications


function Start() {
    const [ findPlan, setFindPlan ] = useState("");
    const [ outView, setOutView ] = useState(false);
    const [ outputGoals, setOutputGoals ] = useState([]);

    const [plan, setPlan] = useState('')
    const [goal, setGoal] = useState('')

    const navigate = useNavigate() // initialization
    const dispatch = useDispatch() // initialization
  
    // const { user } = useSelector((state) => state.auth)      // select user values from user state
    const { plans, planIsLoading, planIsError, planMessage } = useSelector(     // select goal values from goal state
        (state) => state.plans
    )

    // RUNS ON INPUT FIELD CHANGE -- shows search suggestions
    useEffect(() => {

        function handleAgree(id){
            console.log("agree")
            dispatch(updatePlan( id, {agrusers: 69} ))
        }
        function handleDisagree(id){
            console.log("disagree")
            dispatch(updatePlan( id, "user._id"  ))
        }
        function handlePreviewOpen(planObject){
            var scrollheight = window.scrollY;
            setOutView(
                <PlanPreview 
                    screenY={scrollheight} 
                    handlePlanPreviewClose={handlePreviewClose} 
                    planIdentity={planObject}
                />
            )
        }
        function handlePreviewClose(){
            setOutView(null)
        }

        function handleOutputGoals(){
            if(findPlan===null){return;} // No search guard clause
            var outputArray = [];
    
            plans.forEach(( plan, i ) => {
                if(plan.goal){
                    if((findPlan!=="") && (plan.goal.toUpperCase().includes(findPlan.toUpperCase()))){
                        outputArray.push(<>
                            <div key={plan._id+"0"} className='planit-dashboard-start-goals-result'>
                                <div key={plan._id+"1"} className='planit-dashboard-start-goals-result-disagree'><button onClick={() => handleDisagree( plan._id )}>Disagree</button></div>
                                <div key={plan._id+"2"} className='planit-dashboard-start-goals-result-goal'><button className='planit-dashboard-start-goals-result-planbutton' onClick={() => handlePreviewOpen( plan )}>{plan.goal}</button></div>
                                <div key={plan._id+"3"} className='planit-dashboard-start-goals-result-agree'><button onClick={() => handleAgree( plan._id )}>Agree</button></div>
                                <div key={plan._id+"4"} className='planit-dashboard-start-goals-result-plan'><button className='planit-dashboard-start-goals-result-planbutton' onClick={() => handlePreviewOpen( plan )}>{plan.plan}</button></div>
                                
                                {plan.agrusers}
                            </div>
                        </>)
                    }
                }

            });
            setOutputGoals(outputArray);
        }

        handleOutputGoals()
        setGoal(findPlan)
    }, [dispatch, findPlan, plans])


      // called on state changes
    useEffect(() => {
        if (planIsError) {
        // console.log(planMessage)
        toast.error(planMessage) // print error to toast errors

        }
        // if(user){
        dispatch(getPlans()) // dispatch connects to the store, then retreives the plans that match the logged in user.

        return () => {    // reset the plans when state changes
        dispatch(resetPlanSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
        }
    }, [planIsError, planMessage, dispatch])



    // RUNS ON STATE CHANGES - Gets an updated list of all the goals
    useEffect(() => {
        if (planIsError) {
            // console.log(planMessage)
            toast.error(planMessage) // print error to toast errors
        }


        dispatch(getPlans()) // dispatch connects to the store, then retreives the goals that match the logged in user.
        
        return () => {    // reset the goals when state changes
            dispatch(resetPlanSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
        }
    }, [navigate, planIsError, planMessage, dispatch])

    // RUNS ON CREATE PLAN -- sends the new plan and goal text to the database
    const onPlanSubmit = (e) => {
        e.preventDefault()
        dispatch(createPlan({ plan,goal }))   // dispatch connects to the store, then creates a plan with text input
        setPlan('')                      // empty plan field
        setGoal('')                      // empty goal field
    }




    // Shows loading animation while getting goals
    if (planIsLoading) {
        return <Spinner />
    }




    return (<>

        {outView}

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
                        value={findPlan}
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
                    <div >{(outputGoals.length !== 0) ? (
                        <div >
                            {outputGoals}
                        </div>
                    ):
                        <div className='planit-dashboard-start-goals-plan'>
                            <h4>
                                {findPlan}
                            </h4>
                            <form onSubmit={onPlanSubmit}>
                                <h4 className='planit-dashboard-start-goals-sp'>
                                    <input
                                        type='plan'
                                        name='plan'
                                        className='planit-dashboard-start-goals-plan-sp-input' 
                                        placeholder='Enter plan' 
                                        value={plan}
                                        onChange={(e) => setPlan(e.target.value)}
                                        /><br/>
                                    <button type='submit' >Create Plan</button>
                                </h4>
                            </form>
                        </div>
                    }</div>
                }
            </div>
        </div>
    </>)
}

export default Start