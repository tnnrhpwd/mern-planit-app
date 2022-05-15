import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getPlans, resetPlanSlice } from './../../features/plans/planSlice'
import { createPlan } from '../../features/plans/planSlice'

function Start() {
    const [ findPlan, setFindPlan ] = useState("");
    // const [ outView, setOutView ] = useState(false);
    const [ outputGoals, setOutputGoals ] = useState([]);

    const [plan, setPlan] = useState('')
    const [goal, setGoal] = useState('')

    const navigate = useNavigate() // initialization
    const dispatch = useDispatch() // initialization
  
    // const { user } = useSelector((state) => state.auth)      // select user values from user state
    const { plans, isLoading, isError, message } = useSelector(     // select goal values from goal state
        (state) => state.plans
    )

    // RUNS ON INPUT FIELD CHANGE -- shows search suggestions
    useEffect(() => {

        function handleOutputGoals(){
            if(findPlan===null){return;} // No search guard clause
            var outputArray = [];
    
            plans.forEach(( plan, i ) => {
                if(plan.goal){
                    if((findPlan!=="") && (plan.goal.toUpperCase().includes(findPlan.toUpperCase()))){
                        outputArray.push(<>
                            <div className='planit-dashboard-start-goals-result'>
                                <h4>{plan.goal}</h4>
                                {plan.plan}
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
    }, [findPlan, plans])

    // RUNS ON STATE CHANGES - Gets an updated list of all the goals
    useEffect(() => {
        if (isError) {
        console.log(message)
        }


        dispatch(getPlans()) // dispatch connects to the store, then retreives the goals that match the logged in user.
        
        return () => {    // reset the goals when state changes
            dispatch(resetPlanSlice()) // dispatch connects to the store, then reset state values( message, isloading, iserror, and issuccess )
        }
    }, [navigate, isError, message, dispatch])

    // RUNS ON CREATE PLAN -- take
    const onPlanSubmit = (e) => {
        e.preventDefault()
        dispatch(createPlan({ plan,goal }))   // dispatch connects to the store, then creates a plan with text input
        setPlan('')                      // empty plan field
        setGoal('')                      // empty goal field
    }


    // Shows loading animation while getting goals
    if (isLoading) {
        return <Spinner />
    }


    return (
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
    )
}

export default Start