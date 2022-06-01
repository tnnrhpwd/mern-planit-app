import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import { useParams } from "react-router-dom"
import { toast } from 'react-toastify'                        // visible error notifications
import { getPlans, resetPlanSlice } from './../../features/plans/planSlice'
import { getComments, resetCommentSlice } from './../../features/comments/commentSlice'
import Spinner from '../../components/Spinner/Spinner';
import './InfoPlan.css';
import CommentResult from '../../components/CommentResult/CommentResult'

function InfoPlan() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [ chosenPlan, setChosenPlan ] = useState(null);
    const [ importedComments, setImportedComments ] = useState(null);

    const { plans, planIsLoading, planIsError, planMessage } = useSelector(     // select goal values from goal state
        (state) => state.plans
    )
    const { user, authIsLoading, authIsError, authMessage } = useSelector(
        (state) => state.auth
    )
    const { comments, commentIsLoading, commentIsError, commentMessage } = useSelector(     // select goal values from goal state
    (state) => state.comments
    )


    // called on state changes
    useEffect(() => {
        if ( planIsError || authIsError || commentIsError ) {
            // console.log(planMessage)
            toast.error(planMessage) // print error to toast errors
            toast.error(authMessage) // print error to toast errors
            toast.error(commentMessage) // print error to toast errors

        }

        dispatch(getPlans()) // dispatch connects to the store, then retreives the plans that match the logged in user.
        dispatch(getComments()) // dispatch connects to the store, then retreives the plans that match the logged in user.

  
        
        return () => {    // reset the plans when state changes
        dispatch(resetPlanSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
        dispatch(resetCommentSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
        }
    }, [planIsError, planMessage, dispatch, authIsError, commentIsError, authMessage, commentMessage])

    useEffect(() => {
        if(!chosenPlan){
            plans.forEach( elementPlan => {
                if( elementPlan._id === id ){
                    setChosenPlan( elementPlan )
                    var outputArray = [];
                    comments.forEach( elementComment => {
                        if( elementComment.plan === elementPlan._id ){
                            outputArray.push(
                                <CommentResult key={elementComment._id} comment={elementComment}/>
                            )
                        }
                    });
                    setImportedComments(outputArray)
                }
            });
        }
    }, [chosenPlan, comments, id, plans])


    if(authIsLoading){
        return(<Spinner/>)
    }

    if(chosenPlan){
        return (
            <div className="infoplan">
                <div className='infoplan-goal'>
                    <div className='infoplan-goal-text'>
                        { chosenPlan.goal }
                    </div>
                </div>                 
                <div className='infoplan-plan'>
                    <div className='infoplan-plan-text'>
                        { chosenPlan.plan }
                    </div>
                </div> 
                <div className='infoplan-comments'>
                    {importedComments} 
                </div>
            </div>
        )
    }else{
        return(<Spinner/>)
    }

}

export default InfoPlan