import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import PlanInput from './../../components/PlanInput/PlanInput.jsx';
import PlanResult from './../../components/PlanResult/PlanResult.jsx';
import { toast } from 'react-toastify'                        // visible error notifications
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getData, resetDataSlice } from './../../features/data/dataSlice'
import './Plans.css';

function Plans() {
  const [ showNewData, setShowNewData] = useState(false);
  const [ showMyPlans, setShowMyPlans ] = useState(false);
  const [ myPlans, setMyPlans ] = useState([])
  const [ showSavedPlans, setShowSavedPlans ] = useState(false)
  const [ savedPlans, setSavedPlans ] = useState([])
  // const [ dataObjectArray, setDataObjectArray ] = useState([]);

  const navigate = useNavigate() // initialization
  const dispatch = useDispatch() // initialization

  const { user, data, dataIsLoading, dataIsSuccess, dataIsError, dataMessage } = useSelector(     // select values from state
  (state) => state.data
  )

  // called on state changes
  useEffect(() => {
    if (!user) {            // if no user, redirect to login
      navigate('/login') 
    }
    if (dataIsError) {
      toast.error(dataMessage) // print error to toast errors

    }

    async function getMyData(){
      try {
        dispatch(getData({ 
          data: "Goal:", 
        })); // dispatch connects to the store, then retrieves the datas.
      } catch (error) {
        console.error(error);
        toast.error(error);
      }
    }

    getMyData()
    return () => {    // reset the data when state changes
      dispatch(resetDataSlice()) // dispatch connects to the store, then reset state values( dataMessage, isloading, iserror, and issuccess )
    }
  }, [dataIsError, dataMessage, dispatch, navigate, user])

  // useEffect(() => {
  //   function handleAllOutputDatas(dataObjectArray){ 
  //     var outputMyDatasArray = []; var outputSavedDatasArray = [];

  //     dataObjectArray.forEach( data => {
  //       if( ( data[1] === user._id  ) ){
  //         outputMyDatasArray.push(<PlanResult 
  //           key={"MyDataResult"+data[0]}
  //           importDataArray = {data}
  //         />)
  //       }
  //       if( ( data[7].includes(user._id) ) ){
  //         outputSavedDatasArray.push(<PlanResult 
  //           key={"SavedDataResult"+data[0]}
  //           importDataArray = {data}
  //         />)
  //       }
  //     });

  //     setMyDatas(outputMyDatasArray); setSavedDatas(outputSavedDatasArray); 
  //   }

    // handleAllOutputDatas(dataObjectArray);
  // }, [user._id])

  function handleCreateDataToggle(){
    if(showNewData){setShowNewData(false)}
    else if(!showNewData){setShowNewData(true)}
  }
  function handleMyPlansToggle(){
    if(showMyPlans){setShowMyPlans(false)}
    else if(!showMyPlans){setShowMyPlans(true)}
  }
  function handleSavedPlansToggle(){
    if(showSavedPlans){setShowSavedPlans(false)}
    else if(!showSavedPlans){setShowSavedPlans(true)}
    console.log(showSavedPlans)
  }

  // if(dataObjectArray.length > 0){
    return (
      <div className='planit-plans'>
        Plans
        <div className='planit-plans-text'>
          Every journey begins with a step.
        </div>
        <div  className='planit-plans-create' >
          
          <div onClick={handleCreateDataToggle} className='planit-plans-create-text'>
            {
              showNewData ? "Cancel Plan":"Create Plan"
            }
          
          </div>
          { ( user ) &&
            <div className='planit-plans-in'>
              {(showNewData) &&
                <PlanInput />
              }
  
            </div>
          }
        </div>
  
        <div className='planit-plans-my'>
          <div onClick={handleMyPlansToggle} className="planit-plans-my-text">
            My Plans
          </div>
        
          { showMyPlans &&
            <div className='planit-plans-my-out'>
              { ( myPlans.length > 0 ) ? (
                <div className='planit-plans-my-out-result'>
                  { myPlans }
                </div>
               ) : ( 
                <h3>You have not set any plans</h3>
              )} 
            </div>
          }
        </div>
        <div className='planit-plans-saved'>
          <div onClick={handleSavedPlansToggle} className="planit-plans-saved-text">
            Saved Plans
          </div>
          { showSavedPlans &&
            <div className='planit-plans-saved-out'>
              { ( savedPlans.length > 0 ) ? (
                <div className='planit-plans-saved-out-result'>
                  { savedPlans }
                </div>
              ) : (
                <h3>You have not set any plans</h3>
              )}
            </div>
          }
        </div>
      </div>
    )
  // }else{return <Spinner/>}
}

export default Plans