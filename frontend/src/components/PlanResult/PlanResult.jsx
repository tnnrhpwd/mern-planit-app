import { useState } from 'react';
import { useDispatch } from 'react-redux'      // access state variables
import { updatePlan } from '../../features/plans/planSlice'
import ShareView from '../ShareView/ShareView.jsx'
import { toast } from 'react-toastify'                        // visible error notifications
import CreatedAt from './CreatedAt';
import { useNavigate } from 'react-router-dom';
import ThumbsUp from './../../assets/thumbs-up.svg';
import ManageView from '../ManageView/ManageView';
import ThumbsDown from './../../assets/thumbs-down.svg';
import './PlanResult.css';

function PlanResult(props) {
  const dispatch = useDispatch()  // initialization
  const navigate = useNavigate();
  
  const [ shareView, setShareView ] = useState(null);
  const [ manageView, setManageView ] = useState(null);

  const plan = props.plan
  const comments = props.comments

  var user = false;
  if( props.user ){ user = props.user }

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
            const manageViewComponent = <ManageView plan={props.plan} user={user} view={true} click={setManageView} type={type} id={id}/>;
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

    return (<>
        { shareView }
        { manageView }

        <div key={plan._id+"0"} className='planit-planresult'>
            <div key={plan._id+"0.1"} className='planit-planresult-1'>
                <div className='planit-planresult-date'>
                    <CreatedAt createdAt={plan.createdAt}/>
                </div>
                <div className='planit-planresult-share'>
                    <button className='planit-planresult-share-btn' onClick={() => handleShareView("plan",plan._id)}>Share</button>
                </div>
                <div className='planit-planresult-fav'>
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
                <div className='planit-planresult-manageplan'>
                    { (user) ? <>{
                        <button className='planit-planresult-manageplan-btn' onClick={() => handleManageView("plan",plan._id)} >☸</button>
                    }</>:null}
                </div>
            </div>
            <div key={plan._id+"0.2"} className='planit-planresult-2'>
                <div key={plan._id+"2"} className='planit-planresult-goal'><a href={'plan/'+plan._id}><button key={plan._id+"2button"} className='planit-planresult-goalbutton'>{plan.goal}</button></a></div>
                <div key={plan._id+"4"} className='planit-planresult-plan'><a href={'plan/'+plan._id}><button key={plan._id+"4button"} className='planit-planresult-planbutton'>{plan.plan.map(( planElement, planElementIndex ) => (<div key={plan._id+"element"+planElementIndex}>{planElement}</div>))}</button></a></div>
            </div>
            <div key={plan._id+"0.3"} className='planit-planresult-3'>
                <div key={plan._id+"1"} className="planit-planresult-disagree-div">
                    {(user) ?
                        <>{(plan.disusers.includes(user._id)) ?
                            <button key={plan._id+"1button"} className='planit-planresult-disagreeACT' onClick={() => handleDisagree( plan._id )}><img className='planit-planresult-thumb' src={ThumbsDown} alt='thumbs down logo'/></button>
                        :
                            <button key={plan._id+"1.5button"} className='planit-planresult-disagree' onClick={() => handleDisagree( plan._id )}><img className='planit-planresult-thumb' src={ThumbsDown} alt='thumbs down logo'/></button>
                    }</>:null}
                </div>
                <div key={plan._id+"3"} className="planit-planresult-agree-div">
                    {(user) ?
                    <>{(plan.agrusers.includes(user._id)) ?
                        <button key={plan._id+"3button"} className='planit-planresult-agreeACT' onClick={() => handleAgree( plan._id )}><img className='planit-planresult-thumb' src={ThumbsUp} alt='thumbs up logo'/></button>
                    :
                        <button key={plan._id+"3button"} className='planit-planresult-agree' onClick={() => handleAgree( plan._id )}><img className='planit-planresult-thumb' src={ThumbsUp} alt='thumbs up logo'/></button>
                    }</>:null}
                </div>
                <div className='planit-planresult-votecomment-holder' >
                    <a href={'plan/'+plan._id} className='planit-planresult-votecomment-link'>
                        <div className='planit-planresult-votecomment' >
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

export default PlanResult