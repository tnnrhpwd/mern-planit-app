import { useRef } from 'react';
import useOutsideAlerter from '../useOutsideAlerter.js'
import './AddView.css';

function AddView(props) {
    const type = props.type.toLowerCase();
    const id = props.id;

    const hideComponentVisibility = () => { props.click( null ); }
    const ComponentVisibility = () => { return( true ) }  
    const toggleButtonRef = useRef(null);  // reference to the dropper toggle button
    const insideComponentRef = useRef(null); // reference to the dropper container
    useOutsideAlerter( "share", insideComponentRef, toggleButtonRef, ComponentVisibility, hideComponentVisibility ); // listen for clicks outside dropper container && handle the effects


    return (<>
        <div className='planit-addview'>
            <div className='planit-addview-spc' ref={insideComponentRef}>
                <div className='planit-addview-spc-title'>
                    AddView
                </div>
                <button className='planit-addview-spc-close' ref={toggleButtonRef} onClick={hideComponentVisibility}>
                    Close
                </button>
            </div>

        </div>
    </>)
}

export default AddView