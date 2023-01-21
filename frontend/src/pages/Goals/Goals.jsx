import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import GoalInput from './../../components/GoalInput/GoalInput.jsx';
// import GoalResult from './../../components/GoalResult/GoalResult.jsx';
// import Spinner from './../../components/Spinner/Spinner.jsx'
import { getDatas, resetDataSlice } from './../../features/datas/dataSlice'
import { toast } from 'react-toastify'                        // visible error notifications
import './Goals.css';

function Goals() {
  const [ showNewGoal] = useState(false);
  const [ showMyGoals ] = useState(false);
  const [ myGoals ] = useState([])
  // const [ showSavedGoals, setShowSavedGoals ] = useState(false)
  // const [ savedGoals, setSavedGoals ] = useState([])
  // const [ goalObjectArray, setGoalObjectArray ] = useState([]);

  const navigate = useNavigate() // initialization
  const dispatch = useDispatch() // initialization

  const { user } = useSelector((state) => state.auth)      // select user values from user state
  const { dataIsError, dataMessage } = useSelector(     // select goal values from data state
    (state) => state.datas
  )

  // called on state changes
  useEffect(() => {
    if (dataIsError) {
      toast.error(dataMessage, { autoClose: 1000 });
    }

    dispatch(getDatas()) // dispatch connects to the store, then retreives the comments.

    if (!user) {            // if no user, redirect to login
      navigate('/login') 
    }

    return () => {    // reset the goals when state changes
      dispatch(resetDataSlice()) // dispatch connects to the store, then reset state values( goalMessage, isloading, iserror, and issuccess )
    }
  }, [dataIsError, dataMessage, dispatch, navigate, user])

  // useEffect(() => {
  //   function handleAllOutputPlans(ObjectArray){ 
  //     var outputMyGoalsArray = []; // var outputSavedGoalsArray = [];

  //     ObjectArray.forEach( goal => {
  //       let freqNumPlanGoals = 0; // stores number of plans that include the action
  //       let freqNumGoalPlans = 0; // stores number of plans on how to complete this goal.

  //       planitObjectArray[1].forEach(( plan ) => {
  //         plan[3].forEach(( innerPlan ) => {
  //           if( innerPlan[0] === goal[0] ){
  //             freqNumPlanGoals++;
  //           }
  //         })
  //       })
  //       planitObjectArray[1].forEach(( plan ) => {
  //         if( plan[2][0] === goal[0] ){
  //           freqNumGoalPlans++;
  //         }
  //       })


  //       // const numPlanIncluded = freqNumPlanGoals + freqNumGoalPlans
  //       if( ( goal[2] === user._id  ) ){
  //       outputMyGoalsArray.push(<GoalResult 
  //           key={"MyGoalResult"+goal[0]}
  //           freqNumPlanGoals = {freqNumPlanGoals}
  //           freqNumGoalPlans = {freqNumGoalPlans}
  //           importGoalArray = {goal}
  //         />)
  //       }
  //       // if( ( goal[7].includes(user._id) ) ){
  //         //   outputSavedPlansArray.push(<GoalResult 
  //         //     key={"SavedGoalResult"+goal[0]}
  //         //     importPlanArray = {goal}
  //         //   />)
  //       // }
  //     });

  //     setMyGoals(outputMyGoalsArray);// setSavedGoals(outputSavedPlansArray); 
  //   }
  //   console.log(goalObjectArray)
  //   handleAllOutputPlans(goalObjectArray);
  // }, [goalObjectArray, planitObjectArray, user._id])

  // function handleCreateGoalToggle(){
  //   if(showNewGoal){setShowNewGoal(false)}
  //   else if(!showNewGoal){setShowNewGoal(true)}
  // }
  // function handleMyGoalsToggle(){
  //   if(showMyGoals){setShowMyGoals(false)}
  //   else if(!showMyGoals){setShowMyGoals(true)}
  // }


  return (
    <div className='planit-goals'>
      Goals
      <div className='planit-goals-text'>
        Every journey begins with a step.
        <br/><br/> Create plans for other peoples' goals, or get their input on your goals.
        <br/> 
      </div>
      <div className='planit-plans-create'>
        <div className='planit-plans-create-text' >
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
          <div className="planit-plans-my-text">
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