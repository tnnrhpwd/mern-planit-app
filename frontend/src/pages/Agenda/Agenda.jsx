import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'              // redirect the user
import { useSelector, useDispatch } from 'react-redux'      // access state variables
import ActionInput from '../../components/ActionInput/ActionInput';
import ActionResult from '../../components/ActionResult/ActionResult';
import { toast } from 'react-toastify'                        // visible error notifications
// import Spinner from './../../components/Spinner/Spinner.jsx'
import { getDatas, resetDataSlice } from './../../features/data/dataSlice'
// import BuildPlanObjectArray from '../../components/BuildPlanitObjectArray.js';
import './Agenda.css';

function Agenda() {
  const [ showCreateAction, setShowCreateAction ] = useState(false)
  const [ showMyActions, setShowMyActions ] = useState(false)
  const [ showCalendar, setShowCalendar ] = useState(false)
  const [ planitObjectArray, setPlanitObjectArray ] = useState([]);

  const [ myActions, setMyActions ] = useState(false)

  const navigate = useNavigate() // initialization
  const dispatch = useDispatch() // initialization

  const { user } = useSelector((state) => state.auth)      // select user values from user state
  const { datas, dataIsError, dataMessage } = useSelector(     // select data values from data state
    (state) => state.datas
  )


  // called on state changes
  useEffect(() => {
    if (dataIsError) {
      toast.error(dataMessage) // print error to toast errors

    }

    dispatch(getDatas()) // dispatch connects to the store, then retrieves the datas.


  
    if (!user) {            // if no user, redirect to login
      navigate('/login') 
    }

    
    return () => {    // reset the plans when state changes
      dispatch(resetDataSlice()) // dispatch connects to the store, then reset state values( planMessage, isloading, iserror, and issuccess )
    }
  }, [dataIsError, dataMessage, dispatch, navigate, user])

  useEffect(() => {
    function handleAllOutputActions(planitObjectArray){ 
      var outputMyActionsArray = [];

      planitObjectArray[3].forEach( selAction => {
        outputMyActionsArray.push(<ActionResult selAction={selAction}/>)
      });

      setMyActions(outputMyActionsArray)
    }
    if(planitObjectArray.length > 0){
      handleAllOutputActions(planitObjectArray);
    }
  }, [planitObjectArray, user._id])



  const toggleShowCreateAction = () => {
    if(showCreateAction){setShowCreateAction(false)}
    else if(!showCreateAction){setShowCreateAction(true)}
  }
  const toggleShowMyActions = () => {
    if(showMyActions){setShowMyActions(false)}
    else if(!showMyActions){setShowMyActions(true)}
  }
  const toggleShowCalendar = () => {
    if(showCalendar){setShowCalendar(false)}
    else if(!showCalendar){setShowCalendar(true)}
  }

  return (<>
    <div className='agenda'>
        <div className='agenda-title'>
          Agenda
        </div>
        <div className='agenda-descr'>
          where plans become actions
        </div>

        <br/>

        <div className='agenda-create'>
          <div className='agenda-selection' onClick={toggleShowCreateAction}> Create Action </div>
          { (showCreateAction) &&
            <div>
              <ActionInput/>
            </div>
          }
        </div>

        <br/>

        <div className='agenda-my'>
          <div className='agenda-selection' onClick={toggleShowMyActions}> My Actions </div>
          { (showMyActions) &&
            <div>
              { myActions }
            </div>
          }
        </div>

        <br/>

        <div className='agenda-calen'>
          <div className='agenda-selection' onClick={toggleShowCalendar}> My Calendar </div>
          { (showCalendar) &&
            <div>hi</div>
          }
        </div>


    </div>
  </>)
}

export default Agenda