import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'    
import { logout, resetAuthSlice } from './../../features/auth/authSlice.js'
import HeaderLogo from './../../assets/planit192.png';
import './Header.css';


function Header() {
  // const navigate = useNavigate() // initialization
  // const dispatch = useDispatch() // initialization
  // const { user } = useSelector((state) => state.auth)   // select values from state
  const [ colTheme, setColTheme ] = useState(null);

  useEffect(() => {     // RUNS ON START -- Checks browser for color theme preference. Sets dark mode otherwise.
    const theme = localStorage.getItem('theme');
    if(theme==='light-theme') {
      setLightMode();
    } else if(theme==='dark-theme') {
      setDarkMode();
    } else {
      setDarkMode();
    }
  }, []);

  function setDarkMode(){
    setColTheme('dark-theme');  // set theme state variable 
    localStorage.setItem('theme', 'dark-theme'); // store preference in user storage 
    if(document.body.classList.contains('light-theme')){ // if theme already set
      document.body.classList.replace('light-theme', 'dark-theme');// set to dark mode
    }else{
      document.body.classList.add('dark-theme');
    }
  }
  function setLightMode(){
    setColTheme('light-theme');  // set theme state variable 
    localStorage.setItem('theme', 'light-theme'); // store preference in user storage 
    if(document.body.classList.contains('dark-theme')){ // if theme already set
      document.body.classList.replace('dark-theme', 'light-theme');// set to light mode
    }else{
      document.body.classList.add('light-theme');
    }
  }

  // declare method to remove user item from local storage)
  // const onLogout = () => {
  //   dispatch(logout())  // dispatch connects to the store, then remove user item from local storage
  //   dispatch(resetAuthSlice())  // dispatch connects to the store, then reset state values( message, isloading, iserror, and issuccess )
  //   navigate('/')       // send user to dashboard, which will redirect to login page
  // }


  var clickNum=0;
  function useOutsideAlerter(ref){




    // RUNS TWICE ON STARTUP
    useEffect(() => {

      // console.log("RUNS TWICE ON STARTUP"+clickNum)




      // RUNS ON EVERY CLICK && RUNS ON EACH TOGGLE  => RUNS TWICE ON TOGGLE
      function handleOutsideClick(event){
        clickNum++;
        if((!ref.current.contains(event.target)&&(!hamButton.current.contains(event.target))) || clickNum>2){
          // clickNum++;
          // console.log(document.getElementById("planit-header-dropper__toggle").checked)
          // console.log(!ref.current.contains(event.target))
          console.log("RUNS ON EVERY CLICK && RUNS ON EACH TOGGLE"+clickNum)
          clickNum=0;
          document.getElementById("planit-header-dropper__toggle").checked = false;

          // if((document.getElementById("planit-header-dropper__toggle").checked && !ref.current.contains(event.target) && clickNum > 2)){
          //   clickNum=0;
          //   // clickNum++;
          //   console.log("Close dropper"+clickNum);
          // }
        }

      }





      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick); 
    }, [ref])
  }


  const box = useRef(null);
  useOutsideAlerter(box);
  const hamButton = useRef(null);

  return (
    <>
      <div className='planit-header'>
        <div className='planit-header-logo'>
          <a href='/' onClick={() => {window.scrollTo(0,0)}}>
            <img id='planit-header-logo-img' src={HeaderLogo} alt='website logo'/>
          </a>
        </div>
        {/* <a href='/'>
          <div className='planit-header-title'>
            Planit
          </div>
        </a> */}
        {/* <a href='/plans'>
          <button className="planit-header-plan-portrait">
            +
          </button>
        </a> */}
        <a href='/plans'>
          <button className="planit-header-link-landscape">
            Plans
          </button>
        </a>
        <a href='/goals'>
          <button className="planit-header-link-landscape">
            Goals
          </button>
        </a>
        {/* <a href='/settings'>
          <button className="planit-header-link-landscape">
            Settings
          </button>
        </a> */}
        <a href='/profile'>
          <button className="planit-header-link-landscape">
            Profile
          </button>
        </a>
        {(colTheme==="dark-theme") && <button className='planit-header-themebutton-landscape' onClick={setLightMode}>Light Mode</button>}
        {(colTheme==="light-theme") && <button className='planit-header-themebutton-landscape' onClick={setDarkMode}>Dark Mode</button>}
          {/* <button className="planit-header-profile-landscape">
            {user ? (
              <button className="planit-header-profile-auth" onClick={onLogout}>Log out</button>
            ) : (
              <a href='/login'>
                <button className="planit-header-profile-auth">Log in</button>
              </a>
            )}
          </button> */}
        <div className="planit-header-dropper-space">
          <input id="planit-header-dropper__toggle" type="checkbox" ref={hamButton}/>
          <label className="planit-header-dropper__btn" for="planit-header-dropper__toggle">
            <span></span>
          </label>


          <ul ref={box} className="planit-header-dropper__box">
            
            <div className='planit-header-logo-nav'>
              <Link to='/' onClick={() => {window.scrollTo(0,0); document.getElementById("planit-header-dropper__toggle").checked = false; console.log("close dropper138-");}}>
                <img id='planit-header-logo-img' src={HeaderLogo} alt='website logo'/>
              </Link>
            </div>
            {(colTheme==="dark-theme") && <button className='planit-header-dropper-themebutton' onClick={setLightMode}>Light Mode</button>}
            {(colTheme==="light-theme") && <button className='planit-header-dropper-themebutton' onClick={setDarkMode}>Dark Mode</button>}
            {/* <a className='planit-header-dropper-pagelink' href='/login'>
              {user ? (<>
                <a className='planit-header-dropper-profile' href='/profile'>Profile</a>
                <button className='planit-header-dropper-user' onClick={onLogout}>Log out</button>
                </>) : (
                <button className='planit-header-dropper-user' onClick={onLogout}>Log in</button>
              )}
            </a> */}
            <a className='planit-header-dropper-profile' href='/profile'>Profile</a>
            {/* <a className='planit-header-dropper-pagelink' href='/goals'>Popular</a> */}
            <a className='planit-header-dropper-pagelink' href='/goals'>My Goals</a>
            <a className='planit-header-dropper-pagelink' href='/plans'>My Plans</a>
            <a className='planit-header-dropper-pagelink' href='/settings'>Settings</a>
            <a className='planit-header-dropper-pagelink' href='/about'>About Planit</a>
            <a className='planit-header-dropper-pagelink' href='/legal'>Legal Terms</a>
            
          </ul>
        </div>
        
      </div>
    </>
  )
}

export default Header