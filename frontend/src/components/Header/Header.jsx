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


  function handleCheck() {
    setShowDropper(showDropper+1);
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


        {(colTheme==="dark-theme") && <button className='planit-header-themebutton' onClick={setLightMode}>Light</button>}
        {(colTheme==="light-theme") && <button className='planit-header-themebutton' onClick={setDarkMode}>Dark</button>}
        


        <div className='planit-header-dropper'>
          <input id='planit-header-dropper-checkbox' type='checkbox' checked={showDropper%2===0} onChange={handleCheck}/>
          {(showDropper%2===1) &&
          <ul className='planit-header-dropper-space'>
            {(colTheme==="dark-theme") && <button className='planit-header-dropper-themebutton' onClick={setLightMode}>Light Mode</button>}
            {(colTheme==="light-theme") && <button className='planit-header-dropper-themebutton' onClick={setDarkMode}>Dark Mode</button>}
            <div>Profile</div>
            <div>My Goals</div>
            <div>My Plans</div>
            <div>Settings</div>
            <div>About Planit</div>
            <div>Legal Terms</div>
          </ul>
          }
          
        </div>
        
      </div>
    </>
  )
}

export default Header