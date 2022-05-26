import { useEffect } from "react";

function useOutsideAlerter( insideComponentRef, toggleButtonRef, ComponentVisibility , setComponentVisibility ){  
    var clickNum=0;
    var dropperNum = 0;
    // RUNS TWICE ON STARTUP
    useEffect(() => {
      // RUNS ON EVERY CLICK && RUNS ON EACH TOGGLE  => RUNS TWICE ON TOGGLE
      function handleOutsideClick(event){
        // if dropper button pressed && dropper was closed
        if((toggleButtonRef.current.contains(event.target)) && !ComponentVisibility()){
          dropperNum=1;
          clickNum=0;
        // else if dropper button pressed && dropper was open
        }else if((toggleButtonRef.current.contains(event.target)) && ComponentVisibility()){
          dropperNum=0;
        // else if outside space was clicked && dropper button wasnt pressed
        }else if((!insideComponentRef.current.contains(event.target)) && (!toggleButtonRef.current.contains(event.target))){
          // if dropper is open
          if(dropperNum===1){
            // If (outside space was clicked && dropper button wasnt pressed) && droper was just opened
            if(clickNum===0){
              clickNum++;
            // If (outside space was clicked && dropper button wasnt pressed) && droper has been open
            }else{
              setComponentVisibility();
              clickNum=0;
              dropperNum=0;
            }
          }
        }
      }
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick); 
    }, [insideComponentRef])
}

export default useOutsideAlerter