import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import PlanInput from './../../components/PlanInput/PlanInput.jsx';
import PlanResult from './../../components/PlanResult/PlanResult.jsx';
import { toast } from 'react-toastify'                        // visible error notifications
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getGoals, resetGoalSlice } from './../../features/goals/goalSlice'
import { getPlans, resetPlanSlice } from './../../features/plans/planSlice'
import { getComments, resetCommentSlice } from '../../features/comments/commentSlice.js';
import BuildPlanObjectArray from '../../components/BuildPlanitObjectArray.js';
import './Plans.css';

function Plans() {
  const [ showNewPlan, setShowNewPlan] = useState(false);
  const [ showMyPlans, setShowMyPlans ] = useState(false);
  const [ myPlans, setMyPlans ] = useState([])
  const [ showSavedPlans, setShowSavedPlans ] = useState(false)
  const [ savedPlans, setSavedPlans ] = useState([])
  const [ planObjectArray, setPlanObjectArray ] = useState([]);

  const navigate = useNavigate() // initialization
  const dispatch = useDispatch() // initialization

  const { user } = useSelector((state) => state.auth)      // select user values from user state
  const { plans, planIsLoading, planIsError, planMessage } = useSelector(     // select plan values from plan state
    (state) => state.plans
  )
  const { goals, goalIsLoading, goalIsError, goalMessage } = useSelector(     // select goal values from goal state
    (state) => state.goals
  )
  const { comments, commentIsLoading, commentIsError, commentMessage } = useSelector(     // select plan values from plan state
    (state) => state.comments
  )

  // called on state changes
  useEffect(() => {
    if (planIsError || commentIsError || goalIsError) {
      toast.error(goalMessage) // print error to toast errors
      toast.error(planMessage) // print error to toast errors
      toast.error(commentMessage) // print error to toast errors
    }

    dispatch(getGoals()) // dispatch connects to the store, then retrieves the goals.
    dispatch(getPlans()) // dispatch connects to the store, then retreives the plans.
    dispatch(getComments()) // dispatch connects to the store, then retreives the comments.

  
    if (!user) {            // if no user, redirect to login
      navigate('/login') 
    }

    
    return () => {    // reset the plans when state changes
      dispatch(resetPlanSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
      dispatch(resetCommentSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
    }
  }, [commentIsError, commentMessage, dispatch, goalIsError, goalMessage, navigate, planIsError, planMessage, user])

  useEffect(() => {
    setPlanObjectArray( BuildPlanObjectArray( goals, plans, comments )[1] )
  }, [comments, goals, plans])

  useEffect(() => {
    function handleAllOutputPlans(planObjectArray){ 
      var outputMyPlansArray = []; var outputSavedPlansArray = [];

      planObjectArray.forEach( plan => {
        if( ( plan[1] === user._id  ) ){
          outputMyPlansArray.push(<PlanResult 
            key={"MyPlanResult"+plan[0]}
            importPlanArray = {plan}
          />)
        }
        if( ( plan[7].includes(user._id) ) ){
          outputSavedPlansArray.push(<PlanResult 
            key={"SavedPlanResult"+plan[0]}
            importPlanArray = {plan}
          />)
        }
      });

      setMyPlans(outputMyPlansArray); setSavedPlans(outputSavedPlansArray); 
    }

    handleAllOutputPlans(planObjectArray);
  }, [planObjectArray, user._id])

  function handleCreatePlanToggle(){
    if(showNewPlan){setShowNewPlan(false)}
    else if(!showNewPlan){setShowNewPlan(true)}
  }
  function handleMyPlansToggle(){
    if(showMyPlans){setShowMyPlans(false)}
    else if(!showMyPlans){setShowMyPlans(true)}
    console.log(showMyPlans)
    console.log(planObjectArray)
  }
  function handleSavedPlansToggle(){
    if(showSavedPlans){setShowSavedPlans(false)}
    else if(!showSavedPlans){setShowSavedPlans(true)}
    console.log(showSavedPlans)
  }

  if(planObjectArray.length > 0){
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
              { ( myPlans.length > 0 ) ? (
                <div className='planit-plans-my-out-result'>
                  { myPlans }
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
              { ( savedPlans.length > 0 ) ? (
                <div className='planit-plans-saved-out-result'>
                  { savedPlans }
                </div>
              ) : (
                <h3>You have not set any plans</h3>
              )}
            </div>
          }
        </div>
      </div>
    )
  }else{return <Spinner/>}
}

export default Plans