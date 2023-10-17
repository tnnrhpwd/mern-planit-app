import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import Spinner from './../../components/Spinner/Spinner.jsx'
import { updateData, resetDataSlice } from './../../features/data/dataSlice'
import { toast } from 'react-toastify'    
import React from 'react';


function MiddleDashboard() {
    const navigate = useNavigate() // initialization
    const dispatch = useDispatch() // initialization
  
    const [ returnedData, setReturnedData ] = useState(null);    
    const [ sentData, setSentData ] = useState("null");

    const { user, data, dataIsLoading, dataIsSuccess, dataIsError, dataMessage } = useSelector(     // select plan values from plan state
        (state) => state.data
    )

    // called on state changes
    useEffect(() => {
        if (dataIsError) {
            console.log(dataMessage)
            toast.error(dataMessage+data)
        }if (dataIsSuccess) {
            console.log(dataMessage+data)
            toast.success(dataMessage+data)
            setReturnedData(dataMessage+data)
        }

    
        if (!user) {            // if no user, redirect to login
          navigate('/login') 
        }
    
        // dispatch(getDatas()) // dispatch connects to the store, then retreives the plans that match the logged in user.
    
        return () => {    // reset the plans when state changes
        dispatch(resetDataSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
        }
    }, [navigate, dispatch, dataIsError, user, dataMessage, dataIsSuccess, data])

    if (dataIsLoading) {
        return <Spinner />
    }

    async function callData() {
        try {
          // Check if sentData is not empty
          if (sentData.trim() === "") {
            toast.error("Please enter data to send to OpenAI.");
            return;
          }
    
          // Dispatch the getData action with the sentData
          dispatch(updateData({ text: sentData }));
    
          // Reset the textarea after sending the data
          setSentData("");
    
          // ...other code...
        } catch (error) {
          // Handle any errors here
          console.error(error);
          toast.error("An error occurred while fetching data from OpenAI.");
        }
      }

    return (
        <div className='planit-dashboard-popular-mid'>
            Send message to our servers, and we will give you some of our data in return.{sentData}
            <div className='planit-dashboard-popular-left-plans'>
            <textarea 
                    value={sentData}
                    name='plan'
                    placeholder='Enter data to be sent to OpenAI.'
                    onChange={(e) => setSentData(e.target.value)}   // Update sentData on input change
                    className='infoplan-newcomment-textarea'
                />                
                <button onClick={callData} id='planit-dashboard-popular-left-plans-middledashboard-button'>
                    Get Data
                </button>
                <></>
                {returnedData}
                {/* {plans.length > 0 ? (
                    <div className='planit-plans-out-result'>
                    {plans.map((plan) => (
                        <PlanResult key={plan._id} plan={plan} />
                    ))}
                    </div>
                ) : (
                    <h3>You have not set any plans</h3>
                )} */}
            </div>
        </div>
    )
}

export default MiddleDashboard

