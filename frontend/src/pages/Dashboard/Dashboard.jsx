// import GoalInput from './../../components/GoalInput/GoalInput.jsx';
// import { getPlans, resetPlanSlice } from './../../features/plans/planSlice'
// import LeftDashboard from './LeftDashboard.jsx';
// import MiddleDashboard from './MiddleDashboard.jsx';
import Start from './../../components/Start/Start';
import React from 'react';
import './Dashboard.css';

function Dashboard() {



  return (<>
    <div className='planit-dashboard'>
      <div className='planit-dashboard-upper'>
        Welcome to Planit
        {/* <Start/> */}
      </div>
      {/* <div className='planit-dashboard-popular'> */}
        {/* <LeftDashboard/> */}
    
        {/* <MiddleDashboard/> */}

        {/* <div className='planit-dashboard-popular-right'>
          Right Panel
          <br/>
          Turn goals(direction) into objectives(path w/ measurable criteria)
        </div> */}
      {/* </div> */}
    </div>
  </>)
}

export default Dashboard;