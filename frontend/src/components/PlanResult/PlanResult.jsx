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
    const planObjectArray = props.importPlanArray;

    const dispatch = useDispatch()  // initialization
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth)      // select user values from user state
  
    const [ shareView, setShareView ] = useState(null);
    const [ manageView, setManageView ] = useState(null);

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
            const shareViewComponent = <ShareView view={true} click={setShareView} type={type} id={id}/>;
            setShareView(shareViewComponent);
        }else if( !( shareView === null ) ){
            setShareView(null);
        } 
    }

    function handleManageView(type, id){
        if(!user){ navigate('/login') } // GUARD CLAUSE -- Nonusers go to login.
        if( ( manageView === null ) ){
            const manageViewComponent = <ManageView plan={planObjectArray[0]} owner={planObjectArray[1]} user={user} view={true} click={setManageView} type={type} />;
            setManageView(manageViewComponent);
        }else if( !( manageView === null ) ){
            setManageView(null);
        } 
    }

    if(planObjectArray){
        return (<>
            { shareView }
            { manageView }

            <div key={planObjectArray[0]+"0"} className='planit-planresult'>
                <div key={planObjectArray[0]+"0.1"} className='planit-planresult-1'>
                    <div key={planObjectArray[0]+"0.11"} className='planit-planresult-date'>
                        <CreatedAt key={planObjectArray[0]+"0.12"} createdAt={planObjectArray[8]}/>
                    </div>
                    <div key={planObjectArray[0]+"0.13"} className='planit-planresult-share'>
                        <button key={planObjectArray[0]+"0.14"} className='planit-planresult-share-btn' onClick={() => handleShareView("plan",planObjectArray[0])}>Share</button>
                    </div>
                    <div className='planit-planresult-fav' key={planObjectArray[0]+"0.15"}>
                        { (user) ? <>{
                            <>{ (planObjectArray[7].includes(user._id)) ?
                                <>
                                    <button className='planit-planresult-fav-btn' onClick={() => handleUnfavorite( planObjectArray[0] )} key={planObjectArray[0]+"5.1"}>❤</button>
                                </>
                                :<>
                                    <button className='planit-planresult-unfav-btn' onClick={() => handleFavorite( planObjectArray[0] )} key={planObjectArray[0]+"5.2"}>♡</button>
                                </>
                            }</>
                        }</>:null}
                    </div>
                    <div className='planit-planresult-manageplan' key={planObjectArray[0]+"0.16"}>
                        { (user) ? <>{
                            <button key={planObjectArray[0]+"0.17"} className='planit-planresult-manageplan-btn' onClick={() => handleManageView("plan",planObjectArray[0])} >☸</button>
                        }</>:null}
                    </div>
                </div>
                <div key={planObjectArray[0]+"0.2"} className='planit-planresult-2'>
                    <div key={planObjectArray[0]+"2"} className='planit-planresult-goal'><a href={'plan/'+planObjectArray[0]}><button key={planObjectArray[0]+"2button"} className='planit-planresult-goalbutton'>{planObjectArray[2][1]}</button></a></div>
                    <div key={planObjectArray[0]+"4"} className='planit-planresult-plan'><a href={'plan/'+planObjectArray[0]}><button key={planObjectArray[0]+"4button"} className='planit-planresult-planbutton'>{planObjectArray[3].map(( planElement, planElementIndex ) => (<div key={planObjectArray[0]+"element"+planElement[0]}>{planElement[1]}</div>))}</button></a></div>
                </div>
                <div key={planObjectArray[0]+"0.3"} className='planit-planresult-3'>
                    <div key={planObjectArray[0]+"1"} className="planit-planresult-disagree-div">
                        {(user) ?
                            <>{(planObjectArray[6].includes(user._id)) ?
                                <button key={planObjectArray[0]+"1button"} className='planit-planresult-disagreeACT' onClick={() => handleDisagree( planObjectArray[0] )}><img key={planObjectArray[0]+"4.002"} className='planit-planresult-thumb' src={ThumbsDown} alt='thumbs down logo'/></button>
                            :
                                <button key={planObjectArray[0]+"1.5button"} className='planit-planresult-disagree' onClick={() => handleDisagree( planObjectArray[0] )}><img key={planObjectArray[0]+"4.001"} className='planit-planresult-thumb' src={ThumbsDown} alt='thumbs down logo'/></button>
                        }</>:null}
                    </div>
                    <div key={planObjectArray[0]+"3"} className="planit-planresult-agree-div">
                        {(user) ?
                        <>{(planObjectArray[5].includes(user._id)) ?
                            <button key={planObjectArray[0]+"3button"} className='planit-planresult-agreeACT' onClick={() => handleAgree( planObjectArray[0] )}><img key={planObjectArray[0]+"4.003"} className='planit-planresult-thumb' src={ThumbsUp} alt='thumbs up logo'/></button>
                        :
                            <button key={planObjectArray[0]+"3button"} className='planit-planresult-agree' onClick={() => handleAgree( planObjectArray[0] )}><img key={planObjectArray[0]+"4.004"} className='planit-planresult-thumb' src={ThumbsUp} alt='thumbs up logo'/></button>
                        }</>:null}
                    </div>
                    <div className='planit-planresult-votecomment-holder' key={planObjectArray[0]+"4.005"} >
                        <a href={'plan/'+planObjectArray[0]} className='planit-planresult-votecomment-link' key={planObjectArray[0]+"4.006"}>
                            <div className='planit-planresult-votecomment' key={planObjectArray[0]+"4.007"} >
                                {/* Needed to add this if statement to add "+" before positive */}
                                {(planObjectArray[5].length - planObjectArray[6].length > 0)
                                    ? "+"+(planObjectArray[5].length - planObjectArray[6].length)+" votes "
                                    : (planObjectArray[5].length - planObjectArray[6].length)+" votes "
                                }
                                |
                                {
                                    " " + ( planObjectArray[4].length ) + " comments"
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