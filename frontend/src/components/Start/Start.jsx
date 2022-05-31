import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import Spinner from '../Spinner/Spinner.jsx'
import { getPlans, resetPlanSlice, createPlan, updatePlan, deletePlan } from '../../features/plans/planSlice'
import { getComments, resetCommentSlice, createComment, updateComment } from '../../features/comments/commentSlice'
import { getMyData, resetAuthSlice } from '../../features/auth/authSlice'
import CreatedAt from '../PlanResult/CreatedAt.js'
import ShareView from '../ShareView/ShareView.jsx'
import ThumbsUp from './../../assets/thumbs-up.svg';
import ThumbsDown from './../../assets/thumbs-down.svg';

import PlanPreview from '../PlanPreview/PlanPreview.jsx'
import { toast } from 'react-toastify'                        // visible error notifications
import './Start.css';


function Start() {
    const [ findPlan, setFindPlan ] = useState("");
    const [ shareView, setShareView ] = useState(null);
    
    const [ outputGoals, setOutputGoals ] = useState([]);
    
    const [plan, setPlan] = useState('')
    const [goal, setGoal] = useState('')

    // const navigate = useNavigate() // initialization
    const dispatch = useDispatch() // initialization
  
    // const { user } = useSelector((state) => state.auth)      // select user values from user state
    const { plans, planIsLoading, planIsError, planMessage } = useSelector(     // select goal values from goal state
        (state) => state.plans
    )
    const { comments, commentIsLoading, commentIsError, commentMessage } = useSelector(     // select goal values from goal state
        (state) => state.comments
    )
    const { user, authIsLoading, authIsError, authMessage } = useSelector(
        (state) => state.auth
    )

    
    // Scroll to the top on render
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    // RUNS ON INPUT FIELD CHANGE -- shows search suggestions
    useEffect(() => {
        function handleAgree(id){
            const type = ("agree");
            dispatch( updatePlan( {  id ,type } ) )
        }
        function handleDisagree(id){
            const type = ("disagree");
            dispatch( updatePlan( {  id ,type } ) )
        }
        // function handlePreviewOpen(planObject){
        //     var scrollheight = window.scrollY;
        //     setOutView(
        //         <PlanPreview 
        //             user = {user}
        //             key = "PlanPreviewKey"
        //             screenY = {scrollheight} 
        //             handlePlanPreviewClose = {handlePreviewClose} 
        //             planIdentity = {planObject}
        //             planIDComments = {comments}
        //         />
        //     )
        // }
        // function handlePreviewClose(){
        //     setOutView(null)
        // }
        // function handleDeletePlan(id){
        //     console.log("Delete Plan: ",id)
        //     dispatch(deletePlan(id));
        // }
        
        function handleShareView(type, id){

            if( ( shareView === null ) ){
                const shareViewComponent = <ShareView view={true} click={setShareView} type={type} id={id}/>;
                setShareView(shareViewComponent);
                console.log(true)

            }else if( !( shareView === null ) ){
                setShareView(null);
            } 
        }


        function handleOutputGoals(){
            if(findPlan===null){return;} // No search guard clause
            var outputArray = [];
    
            plans.forEach(( plan, i ) => {
                if(plan.goal){
                    if((findPlan!=="") && (plan.goal.toUpperCase().includes(findPlan.toUpperCase()))){
                        outputArray.push(
                            <div key={plan._id+"0"} className='planit-dashboard-start-goals-result'>
                                <div key={plan._id+"0.1"} className='planit-dashboard-start-goals-result-1'>
                                    <div className='planit-dashboard-start-goals-result-date'>
                                        <CreatedAt createdAt={plan.createdAt}/>
                                    </div>
                                    <div className='planit-dashboard-start-goals-result-share'>
                                        <button onClick={() => handleShareView("plan",plan._id)}>Share</button>
                                    </div>
                                    <div className='planit-dashboard-start-goals-result-manage'>
                                        Manage
                                        {/* { (user) ?
                                        <>{(user._id === plan.user) &&
                                            (<button onClick={() => handleDeletePlan(plan._id)} key={plan._id+"5"}>Delete Plan</button>)
                                        }</>:null} */}
                                    </div>
                                </div>

                                <div key={plan._id+"0.2"} className='planit-dashboard-start-goals-result-2'>
                                    <div key={plan._id+"2"} className='planit-dashboard-start-goals-result-goal'><a href={'plan/'+plan._id}><button key={plan._id+"2button"} className='planit-dashboard-start-goals-result-planbutton'>{plan.goal}</button></a></div>
                                    <div key={plan._id+"4"} className='planit-dashboard-start-goals-result-plan'><a href={'plan/'+plan._id}><button key={plan._id+"4button"} className='planit-dashboard-start-goals-result-planbutton'>{plan.plan}</button></a></div>
                                </div>

                                <div key={plan._id+"0.3"} className='planit-dashboard-start-goals-result-3'>
                                    <div key={plan._id+"1"} className="planit-dashboard-start-goals-result-disagree-div">
                                        {(user) ?
                                            <>{(plan.disusers.includes(user._id)) ?
                                                <button key={plan._id+"1button"} className='planit-dashboard-start-goals-result-disagreeACT' onClick={() => handleDisagree( plan._id )}><img className='planit-dashboard-start-goals-result-thumb' src={ThumbsDown} alt='thumbs down logo'/></button>
                                            :
                                                <button key={plan._id+"1.5button"} className='planit-dashboard-start-goals-result-disagree' onClick={() => handleDisagree( plan._id )}><img className='planit-dashboard-start-goals-result-thumb' src={ThumbsDown} alt='thumbs down logo'/></button>
                                        }</>:null}
                                    </div>

                                    <div key={plan._id+"3"} className="planit-dashboard-start-goals-result-agree-div">
                                        {(user) ?
                                        <>{(plan.agrusers.includes(user._id)) ?
                                            <button key={plan._id+"3button"} className='planit-dashboard-start-goals-result-agreeACT' onClick={() => handleAgree( plan._id )}><img className='planit-dashboard-start-goals-result-thumb' src={ThumbsUp} alt='thumbs up logo'/></button>
                                        :
                                            <button key={plan._id+"3button"} className='planit-dashboard-start-goals-result-agree' onClick={() => handleAgree( plan._id )}><img className='planit-dashboard-start-goals-result-thumb' src={ThumbsUp} alt='thumbs up logo'/></button>
                                        }</>:null}
                                    </div>

                                    <div className='planit-dashboard-start-goals-result-votes'>
                                        {(plan.agrusers.length - plan.disusers.length > 0)
                                            ? "+"+(plan.agrusers.length - plan.disusers.length)+" votes"
                                            : (plan.agrusers.length - plan.disusers.length)+" votes"
                                        }
                                    </div>


                                </div>
                            </div>
                        )
                    }
                }
            });
            setOutputGoals(outputArray);
        }
        handleOutputGoals()
        setGoal(findPlan)
    }, [comments, dispatch, findPlan, plans, shareView, user])
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


        dispatch(getPlans()) // dispatch connects to the store, then retreives the plans that match the logged in user.
        dispatch(getComments()) // dispatch connects to the store, then retreives the plans that match the logged in user.
        // dispatch(getMyData()) // dispatch connects to the store, then retreives the profile data that matches the logged in user.


        return () => {    // reset the plans when state changes
            dispatch(resetPlanSlice()) // dispatch connects to the store, then reset state values( planMessage, planisloading, planiserror, and planissuccess )
            dispatch(resetCommentSlice()) // dispatch connects to the store, then reset state values( commentMessage, commentisloading, commentiserror, and commentissuccess )
            dispatch(resetAuthSlice()) // dispatch connects to the store, then reset state values( authMessage, authisloading, authiserror, and authissuccess )

        }
    }, [planIsError, planMessage, dispatch, commentIsError, commentMessage, authIsError, authMessage])



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
    }, [planIsError, planMessage, dispatch])

    // RUNS ON CREATE PLAN -- sends the new plan and goal text to the database
    const onPlanSubmit = (e) => {
        e.preventDefault()
        dispatch(createPlan({ plan,goal }))   // dispatch connects to the store, then creates a plan with text input
        setPlan('')                      // empty plan field
        setGoal('')                      // empty goal field
    }




    // Shows loading animation while getting plans + comments
    if (planIsLoading || commentIsLoading || authIsLoading) {
        return <Spinner />
    }




    return (<>
        { shareView }

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
                                    <textarea
                                        type='plan'
                                        name='plan'
                                        className='planit-dashboard-start-goals-plan-sp-input' 
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
                    }</div>
                }
            </div>
        </div>
    </>)
}

export default Start