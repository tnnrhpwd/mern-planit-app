import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import HeaderLogo from './../../assets/planit192.png';


function Header() {
  const [ showDropper, setShowDropper ] = useState(0);
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

  return (
    <>
      <div className='planit-header'>
        <div className='planit-header-logo'>
          <Link to='/'>
            <img id='planit-header-logo-img' src={HeaderLogo} alt='website logo'/>
          </Link>
        </div>
        <div className='planit-header-title'>
          Planit
        </div>

        <a href='/plans'>
          <button className="planit-header-plan-portrait">
            +
          </button>
        </a>
        <a href='/plans'>
          <button className="planit-header-plan-landscape">
            My Plans
          </button>
        </a>
        <a href='/goals'>
          <button className="planit-header-plan-landscape">
            My Goals
          </button>
        </a>
        <a href='/settings'>
          <button className="planit-header-plan-landscape">
            Settings
          </button>
        </a>

        {(colTheme==="dark-theme") && <button className='planit-header-themebutton-landscape' onClick={setLightMode}>Light</button>}
        {(colTheme==="light-theme") && <button className='planit-header-themebutton-landscape' onClick={setDarkMode}>Dark</button>}

        <a href='/login'>
          <button className="planit-header-profile-landscape">
            Log in
          </button>
        </a>

        <div className="planit-header-dropper-space">
          <input id="planit-header-dropper__toggle" type="checkbox" />
          <label className="planit-header-dropper__btn" for="planit-header-dropper__toggle">
            <span></span>
          </label>

          <ul className="planit-header-dropper__box">
            {(colTheme==="dark-theme") && <button className='planit-header-dropper-themebutton' onClick={setLightMode}>Light Mode</button>}
            {(colTheme==="light-theme") && <button className='planit-header-dropper-themebutton' onClick={setDarkMode}>Dark Mode</button>}
            <a className='planit-header-dropper-pagelink' href='/login'>Log in</a>
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