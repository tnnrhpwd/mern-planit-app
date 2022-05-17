import { useState, useEffect, useRef } from 'react';


// This function is used to toggle the visibility of components.
function useComponentVisible(initialVisibility) {
  const [ componentVisibility, setComponentVisibility ] = useState(initialVisibility);
  const ref = useRef(null);
  const handleHideDropdown = (event) => {
      if (event.key === 'Escape') {
              setComponentVisibility(false);
      }
  };
  const handleClickOutside = (event) => {
      if ( ref.current && !ref.current.contains(event.target)) {
          setComponentVisibility(false);
      }
  }
  
  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    console.log("begin listening for outclicks")
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
      console.log("stop listening for outclicks")
    }
  });

  return { ref, componentVisibility, setComponentVisibility };
}

export default useComponentVisible