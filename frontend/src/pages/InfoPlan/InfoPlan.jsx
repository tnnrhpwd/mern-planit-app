import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'              // page redirects
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import { useParams } from "react-router-dom"
import { toast } from 'react-toastify'                        // visible error notifications
import { deletePlan, getPlans, resetPlanSlice } from './../../features/plans/planSlice'
import { deleteGoal, getGoals, resetGoalSlice } from './../../features/goals/goalSlice'
import { createComment, deleteComment, getComments, resetCommentSlice } from './../../features/comments/commentSlice'
import DeleteView from '../../components/DeleteView/DeleteView'
import Spinner from '../../components/Spinner/Spinner';
import CommentResult from '../../components/CommentResult/CommentResult'
import BuildPlanObjectArray from '../../components/BuildPlanitObjectArray';
import './InfoPlan.css';

function InfoPlan() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [ chosenPlan, setChosenPlan ] = useState(null);
    const [ importedComments, setImportedComments ] = useState(null);
    const [ newComment, setNewComment ] = useState("");
    const [ planObjectArray, setPlanObjectArray ] = useState([]);
    const [ showDeletePlanConfirmation, setShowDeletePlanConfirmation ] = useState(false);

    const { goals, goalIsLoading, goalIsError, goalMessage } = useSelector(     // select goal values from goal state
        (state) => state.goals
    )
    const { plans, planIsLoading, planIsError, planMessage } = useSelector(     // select plan values from plan state
    (state) => state.plans
)
    const { user, authIsLoading, authIsError, authMessage } = useSelector(
        (state) => state.auth
    )
    const { comments, commentIsLoading, commentIsError, commentMessage } = useSelector(     // select comments values from comments state
    (state) => state.comments
    )

    const navigate = useNavigate() // initialization


    // called on state changes
    useEffect(() => {
        if ( planIsError || authIsError || commentIsError || goalIsError ) {
            toast.error(planMessage) // print error to toast errors
            toast.error(goalMessage) // print error to toast errors
            toast.error(authMessage) // print error to toast errors
            toast.error(commentMessage) // print error to toast errors
        }


        dispatch(getGoals()) // dispatch connects to the store, then retreives the plans that match the logged in user.
        dispatch(getPlans()) // dispatch connects to the store, then retreives the plans that match the logged in user.
        dispatch(getComments()) // dispatch connects to the store, then retreives the plans that match the logged in user.
  
        
        return () => {    // reset the plans when state changes
        dispatch(resetGoalSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
        dispatch(resetPlanSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
        dispatch(resetCommentSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
        }
    }, [authIsError, authMessage, commentIsError, commentMessage, dispatch, goalIsError, goalMessage, planIsError, planMessage])

    useEffect(() => {
        setPlanObjectArray( BuildPlanObjectArray( goals, plans, comments )[1] )
    }, [comments, goals, plans])

    useEffect(() => {
        function handleSelectGoal( IDString, planObjectArray ){
            var outputCommentComponentArray = [];
            const selectedPlan = planObjectArray.find( x => x[0] === IDString )
            console.log(selectedPlan)
            setChosenPlan(selectedPlan)
            if( ( selectedPlan ) ){
                selectedPlan[4].forEach(( selComment, selCommentIndex ) => {
                    outputCommentComponentArray.push(<CommentResult key={"CommentResult"+IDString+" "+selCommentIndex} comment={selComment}/>)
                })
            }
            setImportedComments( outputCommentComponentArray );
        }
        handleSelectGoal( id, planObjectArray )
    }, [id, planObjectArray])


    // if(authIsLoading){
    //     return(<Spinner/>)
    // }

    const handleSubmitNewComment = (e) => {
        e.preventDefault()

        if( newComment === "" ){ toast.error("Please enter your comment first.", { autoClose: 1000 }); return; } // No input text guard clause
        if( newComment.length > 280 ){ toast.error("Please shorten your comment to 280 characters.", { autoClose: 1000 }); return; } // Too long input text guard clause

        const topic = chosenPlan[0];
        const comment = newComment   

        dispatch(createComment({ topic , comment }))

        setNewComment('')
        
        toast.success("Comment Submitted!", { autoClose: 1000 }) // print error to toast errors
    }

    const handleDeletePlan = () => {
        dispatch(deletePlan( chosenPlan[0] ))
        toast.info("Your plan has been deleted.", { autoClose: 2000 }) // print error to toast errors
        navigate('/plans')           // send user to dashboard

    }
    const handleShowDeletePlan = (e) => {
        e.preventDefault()
        if(showDeletePlanConfirmation){setShowDeletePlanConfirmation(false)}
        else if(!showDeletePlanConfirmation){setShowDeletePlanConfirmation(true)}
    }

    if(chosenPlan){
        return (
            <div className="infoplan">
                <div className='infoplan-delete'>
                    { (user) &&
                        <>{ ( user._id === chosenPlan[1]) &&
                            <button 
                                className = 'infoplan-delete-button'
                                onClick = {handleShowDeletePlan}
                                >
                                Delete Plan
                            </button>
                        }</>
                    }
                </div> 
                {   ( showDeletePlanConfirmation ) &&
                    < DeleteView view={true} delFunction={handleDeletePlan} click={setShowDeletePlanConfirmation} type="plan" id={chosenPlan[0]}/>
                }
                <div className='infoplan-goal'>
                    <div className='infoplan-goal-text'>
                        <a href = { '/goal/' + chosenPlan[2][0] }>
                            <button 
                                key = { "goal-text-" + chosenPlan[2][0] } 
                                className = 'infoplan-goal-text-goal'
                                >
                                { chosenPlan[2][1] }
                            </button>
                        </a> 



                    </div>
                </div>                 
                <div className='infoplan-plan'>
                    <div className='infoplan-plan-text'>
                        { chosenPlan[3].map(( goal, goalIndex ) => {
                            return (
                            <a href = { '/goal/' + goal[0] } key = { "plan-text-"+goal[0]+ " " + goalIndex } >
                                <button 
                                    key = { "plan-text-" + goalIndex } 
                                    className = 'infoplan-plan-text-goal'
                                    >
                                    { goal[1] }
                                </button>
                            </a>
                            )
                        }) }
                    </div>
                </div> 
                <div className='infoplan-newcomment'>
                    <textarea 
                        value={newComment}
                        name='plan'
                        placeholder='Enter comment here.'
                        onChange={(e) => setNewComment(e.target.value)}   // change text field value
                        className='infoplan-newcomment-textarea'
                    />
                    <button className='infoplan-newcomment-submit' onClick={handleSubmitNewComment}>
                        Submit
                    </button>
                </div>
                <div className='infoplan-comments'>
                    { importedComments } 
                </div>
            </div>
        )
    }else{
        return(<Spinner/>)
    }

}

export default InfoPlan