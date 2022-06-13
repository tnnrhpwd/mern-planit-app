import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import ShareView from '../ShareView/ShareView.jsx'
import { toast } from 'react-toastify'                        // visible error notifications
import CreatedAt from './CreatedAt';
import { useNavigate } from 'react-router-dom';
import { getPlans, resetPlanSlice, createPlan, updatePlan, deletePlan } from '../../features/plans/planSlice'
import { getGoals, resetGoalSlice, createGoal, updateGoal, deleteGoal } from '../../features/goals/goalSlice'
import { getComments, resetCommentSlice, createComment, updateComment } from '../../features/comments/commentSlice'
import { getMyData, resetAuthSlice } from '../../features/auth/authSlice'

import ThumbsUp from './../../assets/thumbs-up.svg';
import ManageView from '../ManageView/ManageView';
import ThumbsDown from './../../assets/thumbs-down.svg';
import './PlanResult.css';

function PlanResult(props) {
  const [ plan, setPlan ] = useState(null)

  const dispatch = useDispatch()  // initialization
  const navigate = useNavigate();

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
  
  const [ shareView, setShareView ] = useState(null);
  const [ manageView, setManageView ] = useState(null);

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
        function getPlanObjectFromObjectID(planObjectIDString){
            return plans.find( x => x._id === planObjectIDString )
        }
    
        if (plans){
            setPlan(getPlanObjectFromObjectID(props.plan))
            console.log(getPlanObjectFromObjectID(props.plan))
        }
    }, [plans, props.plan])
    

  function getGoalObjectFromObjectID(goalObjectIDString){
    return goals.find( x => x._id === goalObjectIDString )
  }

  function handleAgree(id){
    const type = ("agree");
    dispatch( updatePlan( {  id ,type } ) )
  }

  function handleDisagree(id){
    const type = ("disagree");
    dispatch( updatePlan( {  id ,type } ) )
  }

  function handleFavorite(id){
    const type = ("favorite");
    dispatch( updatePlan( {  id ,type } ) )
    toast.success("Plan added to your favorites!", { autoClose: 1000 })

  }

  function handleUnfavorite(id){
    const type = ("unfavorite");
    dispatch( updatePlan( {  id ,type } ) )
    toast.success("Plan removed from your favorites!", { autoClose: 1000 })
  }

    function handleShareView(type, id){

        if( ( shareView === null ) ){
            // const shareViewComponent = <ShareView view={true} click={setShareView} type={type} id={id}/>;
            const shareViewComponent = 5;
            setShareView(shareViewComponent);
        }else if( !( shareView === null ) ){
            setShareView(null);
        } 
    }

  function handleManageView(type, id){
        if(!user){ navigate('/login') } // GUARD CLAUSE -- Nonusers go to login.

        if( ( manageView === null ) ){
            // const manageViewComponent = <ManageView plan={props.plan} user={user} view={true} click={setManageView} type={type} id={id}/>;
            const manageViewComponent = 5;
            setManageView(manageViewComponent);

        }else if( !( manageView === null ) ){
            setManageView(null);
        } 
  }

  function getCommentCount( planID ){
    if ( !planID ){ return ; }   // GUARD CLAUSE - no plan input
    if ( !comments ){ return ; }   // GUARD CLAUSE - no comments
    var outputArray=[]
    
    comments.forEach(( comment, i ) => {
        if( comment.plan === planID ){
            outputArray.push(
                {comment}
            )
        }
    });
    return ( outputArray.length )
  }
  function getPlanObjectFromObjectID(planObjectIDString){
    return plans.find( x => x._id === planObjectIDString )
}

  if(plan){
    return (<>
        { shareView }
        { manageView }

        <div key={plan._id+"0"} className='planit-planresult'>
            <div key={plan._id+"0.1"} className='planit-planresult-1'>
                <div key={plan._id+"0.11"} className='planit-planresult-date'>
                    <CreatedAt key={plan._id+"0.12"} createdAt={plan.createdAt}/>
                </div>
                <div key={plan._id+"0.13"} className='planit-planresult-share'>
                    <button key={plan._id+"0.14"} className='planit-planresult-share-btn' onClick={() => handleShareView("plan",plan._id)}>Share</button>
                </div>
                <div className='planit-planresult-fav' key={plan._id+"0.15"}>
                    { (user) ? <>{
                        <>{ (plan.followers.includes(user._id)) ?
                            <>
                                <button className='planit-planresult-fav-btn' onClick={() => handleUnfavorite( plan._id )} key={plan._id+"5.1"}>❤</button>
                            </>
                            :<>
                                <button className='planit-planresult-unfav-btn' onClick={() => handleFavorite( plan._id )} key={plan._id+"5.2"}>♡</button>
                            </>
                        }</>
                    }</>:null}
                </div>
                <div className='planit-planresult-manageplan' key={plan._id+"0.16"}>
                    { (user) ? <>{
                        <button key={plan._id+"0.17"} className='planit-planresult-manageplan-btn' onClick={() => handleManageView("plan",plan._id)} >☸</button>
                    }</>:null}
                </div>
            </div>
            <div key={plan._id+"0.2"} className='planit-planresult-2'>
                <div key={plan._id+"2"} className='planit-planresult-goal'><a href={'plan/'+plan._id}><button key={plan._id+"2button"} className='planit-planresult-goalbutton'>{getGoalObjectFromObjectID(plan.goal)}</button></a></div>
                <div key={plan._id+"4"} className='planit-planresult-plan'><a href={'plan/'+plan._id}><button key={plan._id+"4button"} className='planit-planresult-planbutton'>{plan.plan.map(( planElement, planElementIndex ) => (<div key={plan._id+"element"+planElement}>{planElement}</div>))}</button></a></div>
            </div>
            <div key={plan._id+"0.3"} className='planit-planresult-3'>
                <div key={plan._id+"1"} className="planit-planresult-disagree-div">
                    {(user) ?
                        <>{(plan.disusers.includes(user._id)) ?
                            <button key={plan._id+"1button"} className='planit-planresult-disagreeACT' onClick={() => handleDisagree( plan._id )}><img key={plan._id+"4.002"} className='planit-planresult-thumb' src={ThumbsDown} alt='thumbs down logo'/></button>
                        :
                            <button key={plan._id+"1.5button"} className='planit-planresult-disagree' onClick={() => handleDisagree( plan._id )}><img key={plan._id+"4.001"} className='planit-planresult-thumb' src={ThumbsDown} alt='thumbs down logo'/></button>
                    }</>:null}
                </div>
                <div key={plan._id+"3"} className="planit-planresult-agree-div">
                    {(user) ?
                    <>{(plan.agrusers.includes(user._id)) ?
                        <button key={plan._id+"3button"} className='planit-planresult-agreeACT' onClick={() => handleAgree( plan._id )}><img key={plan._id+"4.003"} className='planit-planresult-thumb' src={ThumbsUp} alt='thumbs up logo'/></button>
                    :
                        <button key={plan._id+"3button"} className='planit-planresult-agree' onClick={() => handleAgree( plan._id )}><img key={plan._id+"4.004"} className='planit-planresult-thumb' src={ThumbsUp} alt='thumbs up logo'/></button>
                    }</>:null}
                </div>
                <div className='planit-planresult-votecomment-holder' key={plan._id+"4.005"} >
                    <a href={'plan/'+plan._id} className='planit-planresult-votecomment-link' key={plan._id+"4.006"}>
                        <div className='planit-planresult-votecomment' key={plan._id+"4.007"} >
                            {/* Needed to add this if statement to add "+" before positive */}
                            {(plan.agrusers.length - plan.disusers.length > 0)
                                ? "+"+(plan.agrusers.length - plan.disusers.length)+" votes "
                                : (plan.agrusers.length - plan.disusers.length)+" votes "
                            }
                            |
                            {
                                " "+getCommentCount( plan._id )+" comments"
                            }
                        </div>
                    </a>
                </div>           
            </div>
        </div>
    </>)
  }
}

export default PlanResult