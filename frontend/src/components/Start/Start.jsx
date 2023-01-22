import { useState, useEffect, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import Spinner from '../Spinner/Spinner.jsx'
// import { getPlans, resetPlanSlice, createPlan, updatePlan, deletePlan } from '../../features/plans/planSlice'
import { getDatas, resetDataSlice, createData } from '../../features/data/dataSlice'
// import { getComments, resetCommentSlice, createComment, updateComment } from '../../features/comments/commentSlice'
// import { getMyData, resetAuthSlice } from '../../features/auth/authSlice'
import PlanResult from '../PlanResult/PlanResult.jsx'
import LoginView from '../LoginView/LoginView.jsx'
// import BuildPlanObjectArray from '../BuildPlanitObjectArray.js'

// import PlanPreview from '../PlanPreview/PlanPreview.jsx'
import { toast } from 'react-toastify'                        // visible error notifications
import './Start.css';


function Start() {
    const [ findPlan, setFindPlan ] = useState("");
    const [ loginView, setLoginView ] = useState(false);
    const [ outputPlans, setOutputPlans ] = useState([]);
    // const [ renders, setRenders ] = useState(0);
    
    const [ planObjectArray, setPlanObjectArray ] = useState([]);

    const [plan, setPlan] = useState('')
    const [data, setData] = useState('')



    // const navigate = useNavigate() // initialization
    const dispatch = useDispatch() // initialization
  
    // const { user } = useSelector((state) => state.auth)      // select user values from user state
    const { plans, planIsLoading, planIsError, planMessage } = useSelector(     // select data values from data state
        (state) => state.plans
    )
    const { datas, dataIsLoading, dataIsError, dataMessage } = useSelector(     // select data values from data state
        (state) => state.datas
    )
    const { comments, commentIsLoading, commentIsError, commentMessage } = useSelector(     // select data values from data state
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
        if (dataIsError) {
            toast.error(dataMessage) // print error to toast errors
        }

        // if( ( !user ) && ( renders === 0 ) ){
        //     if(loginView === false){setLoginView( true )}
        //     setRenders( renders + 1 )
        // }


        dispatch(getDatas()) // dispatch connects to the store, then retreives the plans that match the logged in user.





        return () => {    // reset the plans when state changes
            dispatch(resetDataSlice()) // dispatch connects to the store, then reset state values( planMessage, planisloading, planiserror, and planissuccess )
        }
    }, [authIsError, authMessage, commentIsError, commentMessage, dispatch, dataIsError, dataMessage, planIsError, planMessage])

    useEffect(() => {
        // setPlanObjectArray( BuildPlanObjectArray( datas, plans, comments )[1] )
    }, [comments, datas, plans])

    useEffect(() => {
        function handleOutputPlans(planObjectArray){
            if(findPlan===''){return;} // No search guard clause
            if (!planObjectArray || planObjectArray.length===[]) {return;} // guard clause


            var outputArray = [];
            planObjectArray.forEach(( plan, planIndex ) => {
                var includedInPlan = false;
                plan[3].forEach(arrayOfPlanStepProperties => {   // for each plan of a plan
                    if(arrayOfPlanStepProperties[1].toUpperCase().includes(findPlan.toUpperCase())){ // check if the search input is in the plan data
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

    // RUNS ON CREATE PLAN -- sends the new plan and data text to the database
    const onPlanSubmit = (e) => {
        e.preventDefault()
        dispatch(createData({ plan,data }))   // dispatch connects to the store, then creates a plan with text input
        setPlan('')                      // empty plan field
        setData('')                      // empty data field
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
                    My data is to...
                </div>
                <div className='planit-dashboard-start-find-space'>
                    <input 
                        type="text" 
                        className='planit-dashboard-start-find-input'
                        placeholder='( Enter your data )'
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
            <div className='planit-dashboard-start-datas'>
                {(findPlan !== "") && 
                    <div >{(outputPlans.length !== 0) ? (
                        <div >
                            {outputPlans}
                        </div>
                    ):<>
                    {(user) ? 
                        <div className='planit-dashboard-start-datas-plan'>
                            <h4>
                                {findPlan}
                            </h4>
                            <form onSubmit={onPlanSubmit}>
                                <h4 className='planit-dashboard-start-datas-sp'>
                                    <textarea
                                        type='plan'
                                        name='plan'
                                        className='planit-dashboard-start-datas-plan-sp-input' 
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