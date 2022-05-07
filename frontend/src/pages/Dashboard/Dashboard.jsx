import React from 'react'
import './Dashboard.css';

function Dashboard() {
  return (<>
    <div className='planit-dashboard'>
      <div className='planit-dashboard-left'>
        left Panel
      </div>
      <div className='planit-dashboard-mid'>
        Mid Panel
      </div>
      <div className='planit-dashboard-right'>
        Right Panel
      </div>
    </div>
  </>)
}

export default Dashboard;