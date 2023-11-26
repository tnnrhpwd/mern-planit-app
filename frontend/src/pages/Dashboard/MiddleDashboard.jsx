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
    const [ sentData, setSentData ] = useState("");

    const { user, data, dataIsLoading, dataIsSuccess, dataIsError, dataMessage } = useSelector(     // select values from state
        (state) => state.data
    )

    // called on state changes
    useEffect(() => {
        if (dataIsError) {
            toast.error(dataMessage)
        }if (dataIsSuccess) {
            setReturnedData(data)
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
    
          // Dispatch the createData action with the sentData
          dispatch(updateData({ 
            id: "u",
            data: sentData,
            user: user.nickname
          }));
    
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
            <h2>ChatGPT Text Prediction</h2>
            <div className='planit-dashboard-popular-mid-chat'>
                <textarea
                value={sentData}
                name='plan'
                placeholder='Please enter prompt...'
                onChange={(e) => setSentData(e.target.value)}
                className='planit-dashboard-popular-mid-chat-area'
                />
                <button onClick={callData} id='planit-dashboard-popular-mid-chat-button'>
                Send ⚡
                </button>
                {returnedData && (
                <div className='planit-dashboard-popular-mid-chat-results'>
                    <h3>Returned Data:</h3>
                    <p>{returnedData}</p>
                </div>
                )}
            </div>
        </div>
    )
}

export default MiddleDashboard

