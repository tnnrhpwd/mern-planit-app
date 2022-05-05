import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import HeaderLogo from './../../assets/planit192.png';

var loadNum=0; // declaration of number of loads

function Header() {
  const [ colTheme, setColTheme ] = useState(null);
  const [ showDropper, setShowDropper ] = useState(0);


  loadNum++; // had to put light-dark switcher functions inside useeffect since they were loading before the buttons.
  useEffect(() => {
    if(document.body.classList.contains('dark-theme')){
      setColTheme('dark-theme');
    }else{
      setColTheme('light-theme');
    }
    if(loadNum>0){

      const body = document.body;

      const theme = localStorage.getItem('theme');

      if(theme && theme==='light-theme') {
        if(document.body.classList.contains('dark-theme')){
          body.classList.replace('dark-theme', 'light-theme'); setColTheme('light-theme');
        }else{
          body.classList.add('light-theme'); setColTheme('light-theme');
        }
      }
      if(theme && theme==='dark-theme') {
        if(document.body.classList.contains('light-theme')){
          body.classList.replace('light-theme', 'dark-theme'); setColTheme('dark-theme');
        }else{
          body.classList.add('dark-theme'); setColTheme('dark-theme');
        }
      }
    }
  }, [loadNum]);

  function setDarkMode(){
    if(document.body.classList.contains('light-theme')){
      document.body.classList.replace('light-theme', 'dark-theme');
      if(localStorage.getItem('theme')==="light-theme") {localStorage.setItem('theme', 'dark-theme'); setColTheme('dark-theme');}
    }else{
      document.body.classList.add('dark-theme');
      if(localStorage.getItem('theme')==="light-theme") {localStorage.setItem('theme', 'dark-theme'); setColTheme('dark-theme');}
    }
  }
  function setLightMode(){
    if(document.body.classList.contains('dark-theme')){
      document.body.classList.replace('dark-theme', 'light-theme');
      if(localStorage.getItem('theme')==="dark-theme") {localStorage.setItem('theme', 'light-theme'); setColTheme('light-theme');}
    }else{
      document.body.classList.add('light-theme');
      if(localStorage.getItem('theme')==="dark-theme") {localStorage.setItem('theme', 'light-theme'); setColTheme('light-theme');}
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


        {(localStorage.getItem('theme')==="dark-theme") && <button onClick={setLightMode}>Light</button>}
        {(localStorage.getItem('theme')==="light-theme") && <button onClick={setDarkMode}>Dark</button>}
        


        {/* <label className='planit-header-dropper-button-container' for='planit-header-dropper-checkbox'>
          <div className='planit-header-dropper-button'></div>
        </label> */}

        <div className='planit-header-dropper'>
          <input id='planit-header-dropper-checkbox' type='checkbox' checked={showDropper%2===0} onChange={handleCheck}/>
          {(showDropper%2===1) &&
          <ul className='planit-header-dropper-space'>
            {(localStorage.getItem('theme')==="dark-theme") && <button onClick={setLightMode}>Light</button>}
            {(localStorage.getItem('theme')==="light-theme") && <button onClick={setDarkMode}>Dark</button>}
            <li>Profile</li>
            <li>My Goals</li>
            <li>My Plans</li>
            <li>Settings</li>
            <li>About Planit</li>
            <li>Legal Terms</li>
          </ul>
          }
          
        </div>
        
      </div>
    </>
  )
}

export default Header