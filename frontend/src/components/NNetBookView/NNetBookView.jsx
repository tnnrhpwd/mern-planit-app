import { useRef } from 'react'
import useOutsideAlerter from '../useOutsideAlerter.js';
// import HeaderLogo from './../../assets/planit192.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'    
import React from 'react';

import './NNetBookView.css'

function NNetBookView(props) {
  const { user } = useSelector((state) => state.data)   // select values from state
  const hideComponentVisibility = () => {document.getElementById("planit-NNetBookView__toggle").checked = false;}
  const ComponentVisibility = () => {return document.getElementById("planit-NNetBookView__toggle").checked}
  const toggleButtonRef = useRef(null);  // reference to the dropper toggle button
  const isideComponentRef = useRef(null); // reference to the dropper container
  useOutsideAlerter( "menu", isideComponentRef, toggleButtonRef, ComponentVisibility, hideComponentVisibility ); // listen for clicks outside dropper container && handle the effects

  return (
    <div className="planit-NNetBookView-space">
  <input id="planit-NNetBookView__toggle" type="checkbox" />
  <label className="planit-NNetBookView__btn" htmlFor="planit-NNetBookView__toggle" ref={toggleButtonRef}>
    <span>
        🔔
    </span>
  </label>
  <ul ref={isideComponentRef} className="planit-NNetBookView__box">
    <div className='planit-NNetBookView-box-header'>
      Notifications
    </div>
    <div className='planit-NNetBookView-box-body'>
      All clear Captain!
    </div>
  </ul>
</div>

  )
}

export default NNetBookView