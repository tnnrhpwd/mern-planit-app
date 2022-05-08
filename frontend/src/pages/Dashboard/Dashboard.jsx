// import GoalInput from './../../components/GoalInput/GoalInput.jsx';
// import { getPlans, resetPlanSlice } from './../../features/plans/planSlice'
import LeftDashboard from './LeftDashboard.jsx';
import MiddleDashboard from './MiddleDashboard.jsx';
import Start from './Start.jsx';
import './Dashboard.css';

function Dashboard() {



  return (<>
    <div className='planit-dashboard'>
      <div className='planit-dashboard-upper'>
        <Start/>
      </div>
      <div className='planit-dashboard-popular'>
        <LeftDashboard/>

        <MiddleDashboard/>

        <div className='planit-dashboard-popular-right'>
          Right Panel
          <br/>
          Turn goals(direction) into objectives(path w/ measurable criteria)
        </div>
      </div>
    </div>
  </>)
}

export default Dashboard;