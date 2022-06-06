import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useOutsideAlerter from '../useOutsideAlerter.js'
import { toast } from 'react-toastify'                        // visible error notifications
import { deletePlan } from '../../features/plans/planSlice.js';
import DeleteView from '../DeleteView/DeleteView.jsx';
import './ManageView.css';


function ManageView(props) {
    const [ showDeletePlanConfirmation, setShowDeletePlanConfirmation ] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const type = props.type.toLowerCase();
    const id = props.id;
    const user = props.user
    const plan = props.plan

    const hideComponentVisibility = () => { props.click( null ); }
    const ComponentVisibility = () => { return( true ) }  
    const toggleButtonRef = useRef(null);  // reference to the dropper toggle button
    const insideComponentRef = useRef(null); // reference to the dropper container
    useOutsideAlerter( "share", insideComponentRef, toggleButtonRef, ComponentVisibility, hideComponentVisibility ); // listen for clicks outside dropper container && handle the effects

    const handleDeletePlan = () => {
        dispatch(deletePlan( plan._id ))
        toast.info("Your plan has been deleted.", { autoClose: 2000 }) // print error to toast errors

    }
    const handleShowDeletePlan = (e) => {
        e.preventDefault()
        if(showDeletePlanConfirmation){setShowDeletePlanConfirmation(false)}
        else if(!showDeletePlanConfirmation){setShowDeletePlanConfirmation(true)}
        
    }

    return (<>
        {   ( showDeletePlanConfirmation ) &&
            < DeleteView view={true} delFunction={handleDeletePlan} click={setShowDeletePlanConfirmation} type="plan" id={plan._id}/>
        }

        <div className='planit-manageview'>
            <div className='planit-manageview-spc' ref={insideComponentRef}>
                <button className='planit-manageview-spc-close' ref={toggleButtonRef} onClick={hideComponentVisibility}>
                    Close
                </button>
                <div className='planit-manageview-spc-title'>
                    ManageView
                </div>
                { (user._id === plan.user) &&
                    <div className='planit-manageview-spc-delete'>
                        <button onClick={handleShowDeletePlan} className='planit-manageview-spc-delete-btn'>
                            Delete Plan
                        </button>
                    </div>
                }
            </div>
        </div>
    </>)
}

export default ManageView