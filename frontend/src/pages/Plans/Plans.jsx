import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import PlanInput from './../../components/PlanInput/PlanInput.jsx';
import PlanResult from './../../components/PlanResult/PlanResult.jsx';
import { toast } from 'react-toastify'                        // visible error notifications
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getDatas, resetDataSlice } from './../../features/data/dataSlice'
import './Plans.css';

function Datas() {
  const [ showNewData, setShowNewData] = useState(false);
  const [ showMyDatas, setShowMyDatas ] = useState(false);
  const [ myDatas, setMyDatas ] = useState([])
  const [ showSavedDatas, setShowSavedDatas ] = useState(false)
  const [ savedDatas, setSavedDatas ] = useState([])
  const [ dataObjectArray, setDataObjectArray ] = useState([]);

  const navigate = useNavigate() // initialization
  const dispatch = useDispatch() // initialization

  const { user } = useSelector((state) => state.auth)      // select user values from user state
  const { datas, dataIsLoading, dataIsError, dataMessage } = useSelector(     // select data values from data state
    (state) => state.datas
  )

  // called on state changes
  useEffect(() => {
    if (dataIsError) {
      toast.error(dataMessage) // print error to toast errors

    }

    dispatch(getDatas()) // dispatch connects to the store, then retreives the datas.

  
    if (!user) {            // if no user, redirect to login
      navigate('/login') 
    }

    
    return () => {    // reset the datas when state changes
      dispatch(resetDataSlice()) // dispatch connects to the store, then reset state values( dataMessage, isloading, iserror, and issuccess )
    }
  }, [dataIsError, dataMessage, dispatch, navigate, user])

  useEffect(() => {
    function handleAllOutputDatas(dataObjectArray){ 
      var outputMyDatasArray = []; var outputSavedDatasArray = [];

      dataObjectArray.forEach( data => {
        if( ( data[1] === user._id  ) ){
          outputMyDatasArray.push(<PlanResult 
            key={"MyDataResult"+data[0]}
            importDataArray = {data}
          />)
        }
        if( ( data[7].includes(user._id) ) ){
          outputSavedDatasArray.push(<PlanResult 
            key={"SavedDataResult"+data[0]}
            importDataArray = {data}
          />)
        }
      });

      setMyDatas(outputMyDatasArray); setSavedDatas(outputSavedDatasArray); 
    }

    handleAllOutputDatas(dataObjectArray);
  }, [dataObjectArray, user._id])

  function handleCreateDataToggle(){
    if(showNewData){setShowNewData(false)}
    else if(!showNewData){setShowNewData(true)}
  }
  function handleMyDatasToggle(){
    if(showMyDatas){setShowMyDatas(false)}
    else if(!showMyDatas){setShowMyDatas(true)}
  }
  function handleSavedDatasToggle(){
    if(showSavedDatas){setShowSavedDatas(false)}
    else if(!showSavedDatas){setShowSavedDatas(true)}
    console.log(showSavedDatas)
  }

  if(dataObjectArray.length > 0){
    return (
      <div className='datait-datas'>
        Datas
        <div className='datait-datas-text'>
          Every journey begins with a step.
        </div>
        <div  className='datait-datas-create' >
          
          <div onClick={handleCreateDataToggle} className='datait-datas-create-text'>
            {
              showNewData ? "Cancel Data":"Create Data"
            }
          
          </div>
          { ( user ) &&
            <div className='datait-datas-in'>
              {(showNewData) &&
                <PlanInput />
              }
  
            </div>
          }
        </div>
  
        <div className='datait-datas-my'>
          <div onClick={handleMyDatasToggle} className="datait-datas-my-text">
            My Datas
          </div>
        
          { showMyDatas &&
            <div className='datait-datas-my-out'>
              { ( myDatas.length > 0 ) ? (
                <div className='datait-datas-my-out-result'>
                  { myDatas }
                </div>
               ) : ( 
                <h3>You have not set any datas</h3>
              )} 
            </div>
          }
        </div>
        <div className='datait-datas-saved'>
          <div onClick={handleSavedDatasToggle} className="datait-datas-saved-text">
            Saved Datas
          </div>
          { showSavedDatas &&
            <div className='datait-datas-saved-out'>
              { ( savedDatas.length > 0 ) ? (
                <div className='datait-datas-saved-out-result'>
                  { savedDatas }
                </div>
              ) : (
                <h3>You have not set any datas</h3>
              )}
            </div>
          }
        </div>
      </div>
    )
  }else{return <Spinner/>}
}

export default Datas