import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import HeaderLogo from './../../assets/planit192.png';


function Header() {
  const [ showDropper, setShowDropper ] = useState(0);
  const [ colTheme, setColTheme ] = useState(null);

  useEffect(() => {

    const body = document.body;
    const theme = localStorage.getItem('theme');
    if(theme && theme==='light-theme') {
      setColTheme('light-theme');
      if(document.body.classList.contains('dark-theme')){
        body.classList.replace('dark-theme', 'light-theme');
      }else{
        body.classList.add('light-theme');
      }
    }
    if(theme && theme==='dark-theme') {
      setColTheme('dark-theme');
      if(document.body.classList.contains('light-theme')){
        body.classList.replace('light-theme', 'dark-theme');
      }else{
        body.classList.add('dark-theme');
      }
    }
    
  }, []);

  function setDarkMode(){
    setColTheme('dark-theme');
    if(document.body.classList.contains('light-theme')){
      document.body.classList.replace('light-theme', 'dark-theme');
      if(localStorage.getItem('theme')==="light-theme") {localStorage.setItem('theme', 'dark-theme');}
    }else{
      document.body.classList.add('dark-theme');
      if(localStorage.getItem('theme')==="light-theme") {localStorage.setItem('theme', 'dark-theme');}
    }
  }
  function setLightMode(){
    setColTheme('light-theme');
    if(document.body.classList.contains('dark-theme')){
      document.body.classList.replace('dark-theme', 'light-theme');
      if(localStorage.getItem('theme')==="dark-theme") {localStorage.setItem('theme', 'light-theme'); }
    }else{
      document.body.classList.add('light-theme');
      if(localStorage.getItem('theme')==="dark-theme") {localStorage.setItem('theme', 'light-theme');}
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


        {(colTheme==="dark-theme") && <button onClick={setLightMode}>Light</button>}
        {(colTheme==="light-theme") && <button onClick={setDarkMode}>Dark</button>}
        


        <div className='planit-header-dropper'>
          <input id='planit-header-dropper-checkbox' type='checkbox' checked={showDropper%2===0} onChange={handleCheck}/>
          {(showDropper%2===1) &&
          <ul className='planit-header-dropper-space'>
            {(colTheme==="dark-theme") && <button onClick={setLightMode}>Light</button>}
            {(colTheme==="light-theme") && <button onClick={setDarkMode}>Dark</button>}
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