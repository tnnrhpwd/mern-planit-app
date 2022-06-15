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
        handleSelectGoal( id )
    }, [goalObjectArray, id])



    if(chosenGoal){
        return (<div className="infogoal">
            InfoGoal
            {chosenGoal[0]}
            {chosenGoal[1]}
            {chosenGoal[2]}
        </div>)
    }else{ return <Spinner/> }
}

export default InfoGoal