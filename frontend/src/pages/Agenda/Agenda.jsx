import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import ActionInput from '../../components/ActionInput/ActionInput';
import ActionResult from '../../components/ActionResult/ActionResult';
import { toast } from 'react-toastify'                        // visible error notifications
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getGoals, resetGoalSlice } from './../../features/goals/goalSlice'
import { getPlans, resetPlanSlice } from './../../features/plans/planSlice'
import { getComments, resetCommentSlice } from '../../features/comments/commentSlice.js';
import { getActions, resetActionSlice } from '../../features/actions/actionSlice.js';
import BuildPlanObjectArray from '../../components/BuildPlanitObjectArray.js';
import './Agenda.css';

function Agenda() {
  const [ showCreateAction, setShowCreateAction ] = useState(false)
  const [ showMyActions, setShowMyActions ] = useState(false)
  const [ showCalendar, setShowCalendar ] = useState(false)
  const [ planObjectArray, setPlanObjectArray ] = useState([]);

  const [ myActions, setMyActions ] = useState(false)

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
  const { actions, actionIsLoading, actionIsError, actionMessage } = useSelector(     // select action values from plan state
    (state) => state.actions
  )

  // called on state changes
  useEffect(() => {
    if (planIsError || commentIsError || goalIsError || actionIsError) {
      toast.error(goalMessage) // print error to toast errors
      toast.error(planMessage) // print error to toast errors
      toast.error(commentMessage) // print error to toast errors
      toast.error(actionMessage) // print error to toast errors
    }

    dispatch(getGoals()) // dispatch connects to the store, then retrieves the goals.
    dispatch(getPlans()) // dispatch connects to the store, then retreives the plans.
    dispatch(getComments()) // dispatch connects to the store, then retreives the comments.
    dispatch(getActions()) // dispatch connects to the store, then retreives the actions.

  
    if (!user) {            // if no user, redirect to login
      navigate('/login') 
    }

    
    return () => {    // reset the plans when state changes
      dispatch(resetPlanSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
      dispatch(resetCommentSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
    }
  }, [actionIsError, actionMessage, commentIsError, commentMessage, dispatch, goalIsError, goalMessage, navigate, planIsError, planMessage, user])

  useEffect(() => {
    setPlanObjectArray( BuildPlanObjectArray( goals, plans, comments, actions ) )
  }, [actions, comments, goals, plans])

  useEffect(() => {
    function handleAllOutputActions(planObjectArray){ 
      var outputMyActionsArray = [];

      planObjectArray.forEach( selAction => {
        outputMyActionsArray.push(<ActionResult/>)
      });

      setMyActions(outputMyActionsArray)
    }

    handleAllOutputActions(planObjectArray);
  }, [planObjectArray, user._id])



  const toggleShowCreateAction = () => {
    if(showCreateAction){setShowCreateAction(false)}
    else if(!showCreateAction){setShowCreateAction(true)}
  }
  const toggleShowMyActions = () => {
    if(showMyActions){setShowMyActions(false)}
    else if(!showMyActions){setShowMyActions(true)}
  }
  const toggleShowCalendar = () => {
    if(showCalendar){setShowCalendar(false)}
    else if(!showCalendar){setShowCalendar(true)}
  }

  return (<>
    <div className='agenda'>
        <div className='agenda-title'>
          Agenda
        </div>
        <div className='agenda-descr'>
          where plans become actions
        </div>

        <br/>

        <div className='agenda-create'>
          <div className='agenda-selection' onClick={toggleShowCreateAction}> Create Action </div>
          { (showCreateAction) &&
            <div>
              <ActionInput/>
            </div>
          }
        </div>

        <br/>

        <div className='agenda-my'>
          <div className='agenda-selection' onClick={toggleShowMyActions}> My Actions </div>
          { (showMyActions) &&
            <div>
              { myActions }
            </div>
          }
        </div>

        <br/>

        <div className='agenda-calen'>
          <div className='agenda-selection' onClick={toggleShowCalendar}> My Calendar </div>
          { (showCalendar) &&
            <div>hi</div>
          }
        </div>


    </div>
  </>)
}

export default Agenda