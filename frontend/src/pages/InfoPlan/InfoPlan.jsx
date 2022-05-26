import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import { useParams } from "react-router-dom"
import { toast } from 'react-toastify'                        // visible error notifications
import { getPlans, resetPlanSlice } from './../../features/plans/planSlice'
import Spinner from '../../components/Spinner/Spinner';
import './InfoPlan.css';

function InfoPlan() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { plans, planIsLoading, planIsError, planMessage } = useSelector(     // select plan values from plan state
        (state) => state.plans
    )



    // called on state changes
    useEffect(() => {
        if (planIsError) {
        // console.log(planMessage)
        toast.error(planMessage) // print error to toast errors

        }

        dispatch(getPlans()) // dispatch connects to the store, then retreives the plans that match the logged in user.


        // if (!user) {            // if no user, redirect to login
        // navigate('/login') 
        // }

        
        return () => {    // reset the plans when state changes
        dispatch(resetPlanSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
        }
    }, [planIsError, planMessage, dispatch])





    if(planIsLoading){
        return(<Spinner/>)
    }

    return (
        <div className="infoplan">
            This page contains information on plan #{id}
        </div>
    )
}

export default InfoPlan