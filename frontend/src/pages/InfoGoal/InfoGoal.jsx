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
import BuildPlanitObjectArray from '../../components/BuildPlanitObjectArray';
import './InfoGoal.css';

function InfoGoal() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [ chosenGoal, setChosenGoal ] = useState(null);
    const [ importedComments, setImportedComments ] = useState(null);
    const [ newComment, setNewComment ] = useState("");
    const [ goalObjectArray, setGoalObjectArray ] = useState([]);
    const [ showDeleteGoalConfirmation, setShowDeleteGoalConfirmation ] = useState(false);

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
        setGoalObjectArray( BuildPlanitObjectArray( goals, plans, comments )[0] )
    }, [comments, goals, plans])

    useEffect(() => {
        function handleSelectGoal( IDString ){
            const selectedGoal = goalObjectArray.find( x => x[0] === IDString )
            console.log(selectedGoal)
            setChosenGoal(selectedGoal)
        }
        console.log(goalObjectArray)
        handleSelectGoal( id )
    }, [goalObjectArray, id])

    const handleSubmitNewComment = (e) => {
        e.preventDefault()

        if( newComment === "" ){ toast.error("Please enter your comment first.", { autoClose: 1000 }); return; } // No input text guard clause
        if( newComment.length > 280 ){ toast.error("Please shorten your comment to 280 characters.", { autoClose: 1000 }); return; } // Too long input text guard clause

        const topic = chosenGoal[0];
        const comment = newComment   

        dispatch(createComment({ topic , comment }))

        setNewComment('')
        
        toast.success("Comment Submitted!", { autoClose: 1000 }) // print error to toast errors
    }

    const handleDeleteGoal = () => {
        dispatch(deletePlan( chosenGoal[0] ))
        toast.info("Your goal has been deleted.", { autoClose: 2000 }) // print error to toast errors
        navigate('/goals')           // send user to dashboard

    }
    const handleShowDeleteGoal = (e) => {
        e.preventDefault()
        if(showDeleteGoalConfirmation){setShowDeleteGoalConfirmation(false)}
        else if(!showDeleteGoalConfirmation){setShowDeleteGoalConfirmation(true)}
    }

    if(chosenGoal){
        return (<div className="infoplan">
            <div className='infoplan-delete'>
                { (user) &&
                    <>{ ( user._id === chosenGoal[2]) &&
                        <button 
                            className = 'infoplan-delete-button'
                            onClick = {handleShowDeleteGoal}
                            >
                            Delete Plan
                        </button>
                    }</>
                }
            </div> 
            {   ( showDeleteGoalConfirmation ) &&
                < DeleteView view={true} delFunction={handleDeleteGoal} click={setShowDeleteGoalConfirmation} type="goal" id={chosenGoal[0]}/>
            }
            <div className='infoplan-goal'>
                <div className='infoplan-goal-text'>
                    <a href = { '/goal/' + chosenGoal[0] }>
                        <button 
                            key = { "goal-text-" + chosenGoal[0] } 
                            className = 'infoplan-goal-text-goal'
                            >
                            { chosenGoal[1] }
                        </button>
                    </a> 
                </div>
            </div>                 

            <button>Create a new plan for this goal</button>

            <br/>
            <br/>


            <div className='infogoal-potentialplans'>
                potential plans
                <br/>
                { ( chosenGoal[5].length > 0 ) 
                    ? chosenGoal[5].map( specificPlan => {
                        return <button>
                            {specificPlan[3].map( insidePlan => {
                                return insidePlan[1]
                            })}
                        </button>
                    })
                    : "There are no plans for this goal."
                }
            </div>
            <br/>

            <div className='infogoal-potentialgoals'>
                other plans it is included in
                <br/>
                { ( chosenGoal[6].length > 0 ) 
                    ? chosenGoal[6].map( specificPlan => {
                        return <button>
                            {specificPlan[3].map( insidePlan => {
                                return insidePlan[1]
                            })}
                        </button>
                    })
                    : "There are no goals for this goal."
                }
            </div>
            <br/>

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
                { ( importedComments ) 
                ?   ( importedComments ) 
                : "No Comments"                  
                } 
            </div>
        </div>
    )}else{ return <Spinner/> }
}

export default InfoGoal