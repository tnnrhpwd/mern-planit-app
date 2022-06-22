import { useRef } from 'react'
import useOutsideAlerter from '../useOutsideAlerter.js';
import HeaderLogo from './../../assets/planit192.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'    


import './HeaderDropper.css'

function HeaderDropper(props) {

    const { user } = useSelector((state) => state.auth)   // select values from state


const hideComponentVisibility = () => {document.getElementById("planit-header-dropper__toggle").checked = false;}
  const ComponentVisibility = () => {return document.getElementById("planit-header-dropper__toggle").checked}
  const toggleButtonRef = useRef(null);  // reference to the dropper toggle button
  const insideComponentRef = useRef(null); // reference to the dropper container
  useOutsideAlerter( "nav", insideComponentRef, toggleButtonRef, ComponentVisibility, hideComponentVisibility ); // listen for clicks outside dropper container && handle the effects


  return (
    <div className="planit-header-dropper-space">
      <input id="planit-header-dropper__toggle" type="checkbox" />
      <label className="planit-header-dropper__btn" htmlFor="planit-header-dropper__toggle" ref={toggleButtonRef}>
        <span></span>
      </label>
      <ul ref={insideComponentRef} className="planit-header-dropper__box">
        
        <div className='planit-header-logo-nav'>
          <Link to='/' onClick={() => {window.scrollTo(0,0); document.getElementById("planit-header-dropper__toggle").checked = false;}}>
            <img id='planit-header-logo-img' src={HeaderLogo} alt='website logo'/>
          </Link>
        </div>
        {(props.colTheme==="dark-theme") && <button className='planit-header-dropper-themebutton' onClick={props.setLightMode}>Light Mode</button>}
        {(props.colTheme==="light-theme") && <button className='planit-header-dropper-themebutton' onClick={props.setDarkMode}>Dark Mode</button>}
          {user ? (<>
            <a className='planit-header-dropper-profile' href='/profile'>Profile</a>
            {/* <button className='planit-header-dropper-user' >Log out</button> */}
            </>) : (
            <a className='planit-header-dropper-profile' href='/login' >Log in</a>
          )}
        {/* <a className='planit-header-dropper-profile' href='/profile'>Profile</a> */}
        {/* <a className='planit-header-dropper-pagelink' href='/goals'>Popular</a> */}
        {( user ) 
          ?(<>   
            <a className='planit-header-dropper-pagelink' href='/agenda'>Agenda</a>
            <a className='planit-header-dropper-pagelink' href='/goals'>Goals</a>
            <a className='planit-header-dropper-pagelink' href='/plans'>Plans</a>
            <a className='planit-header-dropper-pagelink' href='/settings'>Settings</a>
          </>)
          :null
        }
        <a className='planit-header-dropper-pagelink' href='/about'>About Planit</a>
        {/* <a className='planit-header-dropper-pagelink' href='/legal'>Legal Terms</a> */}
        
      </ul>
    </div>
  )
}

export default HeaderDropper