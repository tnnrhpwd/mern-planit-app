import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import GoalInput from './../../components/GoalInput/GoalInput.jsx';
import GoalResult from './../../components/GoalResult/GoalResult.jsx';
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getPlans, resetPlanSlice } from './../../features/plans/planSlice'
import { getGoals, resetGoalSlice } from './../../features/goals/goalSlice'
import { getComments, resetCommentSlice } from '../../features/comments/commentSlice.js';
import { toast } from 'react-toastify'                        // visible error notifications
import BuildPlanObjectArray from '../../components/BuildPlanitObjectArray.js';
import './Goals.css';

function Goals() {
  const [ showNewGoal, setShowNewGoal] = useState(false);
  const [ showMyGoals, setShowMyGoals ] = useState(false);
  const [ planitObjectArray, setPlanitObjectArray ] = useState([])
  const [ myGoals, setMyGoals ] = useState([])
  const [ showSavedGoals, setShowSavedGoals ] = useState(false)
  const [ savedGoals, setSavedGoals ] = useState([])
  const [ goalObjectArray, setGoalObjectArray ] = useState([]);

  const navigate = useNavigate() // initialization
  const dispatch = useDispatch() // initialization

  const { user } = useSelector((state) => state.auth)      // select user values from user state
  const { goals, goalIsLoading, goalIsError, goalMessage } = useSelector(     // select goal values from goal state
    (state) => state.goals
  )
  const { comments, commentIsLoading, commentIsError, commentMessage } = useSelector(     // select plan values from plan state
    (state) => state.comments
  )
  const { plans, planIsLoading, planIsError, planMessage } = useSelector(     // select plan values from plan state
  (state) => state.plans
)

  // called on state changes
  useEffect(() => {
    if (goalIsError || commentIsError || planIsError) {
      console.log(goalMessage)
      toast.error(commentMessage, { autoClose: 1000 });
      toast.error(goalMessage, { autoClose: 1000 });
    }

    dispatch(getComments()) // dispatch connects to the store, then retreives the comments.
    dispatch(getGoals()) // dispatch connects to the store, then retreives the goals.
    dispatch(getPlans()) // dispatch connects to the store, then retreives the goals.

    if (!user) {            // if no user, redirect to login
      navigate('/login') 
    }

    return () => {    // reset the goals when state changes
      dispatch(resetGoalSlice()) // dispatch connects to the store, then reset state values( goalMessage, isloading, iserror, and issuccess )
      dispatch(resetCommentSlice()) // dispatch connects to the store, then reset state values( goalMessage, isloading, iserror, and issuccess )
    }
  }, [commentIsError, commentMessage, dispatch, goalIsError, goalMessage, navigate, planIsError, user])
  
  useEffect(() => {
    setGoalObjectArray( BuildPlanObjectArray( goals, plans, comments )[0] )
    setPlanitObjectArray( BuildPlanObjectArray( goals, plans, comments ) )
  }, [comments, goals, plans])

  useEffect(() => {
    function handleAllOutputPlans(ObjectArray){ 
      var outputMyGoalsArray = []; // var outputSavedGoalsArray = [];

      ObjectArray.forEach( goal => {
        let freqNumPlanGoals = 0; // stores number of plans that include the action
        let freqNumGoalPlans = 0; // stores number of plans on how to complete this goal.

        planitObjectArray[1].forEach(( plan ) => {
          plan[3].forEach(( innerPlan ) => {
            if( innerPlan[0] === goal[0] ){
              freqNumPlanGoals++;
            }
          })
        })
        planitObjectArray[1].forEach(( plan ) => {
          if( plan[2][0] === goal[0] ){
            freqNumGoalPlans++;
          }
        })


        const numPlanIncluded = freqNumPlanGoals + freqNumGoalPlans
        if( ( goal[2] === user._id  ) ){
        outputMyGoalsArray.push(<GoalResult 
            key={"MyGoalResult"+goal[0]}
            freqNumPlanGoals = {freqNumPlanGoals}
            freqNumGoalPlans = {freqNumGoalPlans}
            importGoalArray = {goal}
          />)
        }
        // if( ( goal[7].includes(user._id) ) ){
          //   outputSavedPlansArray.push(<GoalResult 
          //     key={"SavedGoalResult"+goal[0]}
          //     importPlanArray = {goal}
          //   />)
        // }
      });

      setMyGoals(outputMyGoalsArray);// setSavedGoals(outputSavedPlansArray); 
    }
    console.log(goalObjectArray)
    handleAllOutputPlans(goalObjectArray);
  }, [goalObjectArray, planitObjectArray, user._id])

  function handleCreateGoalToggle(){
    if(showNewGoal){setShowNewGoal(false)}
    else if(!showNewGoal){setShowNewGoal(true)}
  }
  function handleMyGoalsToggle(){
    if(showMyGoals){setShowMyGoals(false)}
    else if(!showMyGoals){setShowMyGoals(true)}
  }


  return (
    <div className='planit-goals'>
      Goals
      <div className='planit-goals-text'>
        Every journey begins with a step.
        <br/><br/> Create plans for other peoples' goals, or get their input on your goals.
        <br/> 
      </div>
      <div className='planit-plans-create'>
        <div onClick={handleCreateGoalToggle} className='planit-plans-create-text' >
          {
            showNewGoal ? "Cancel Goal":"Create Goal"
          }
          { ( user ) &&
            <div className='planit-plans-in'>
              {(showNewGoal) &&
                <GoalInput />
              }
            </div>
          }
        </div>
      </div>

      <div className='planit-plans-my'>
          <div onClick={handleMyGoalsToggle} className="planit-plans-my-text">
            My Goals
          </div>
        
          { showMyGoals &&
            <div className='planit-plans-my-out'>
              { ( myGoals.length > 0 ) ? (
                <div className='planit-plans-my-out-result'>
                  { myGoals }
                </div>
               ) : ( 
                <h3>You have not set any goals</h3>
              )} 
            </div>
          }
        </div>

      All Goals
      <div className='planit-goals-out'>

      </div>
    </div>
  )
}

export default Goals