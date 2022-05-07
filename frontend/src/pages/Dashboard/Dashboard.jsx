// import GoalInput from './../../components/GoalInput/GoalInput.jsx';
// import { getPlans, resetPlanSlice } from './../../features/plans/planSlice'
import LeftDashboard from './LeftDashboard.jsx';
import MiddleDashboard from './MiddleDashboard.jsx';
import './Dashboard.css';

function Dashboard() {



  return (<>
    <div className='planit-dashboard'>

      <LeftDashboard/>

      <MiddleDashboard/>

      <div className='planit-dashboard-right'>
        Right Panel
      </div>

    </div>
  </>)
}

export default Dashboard;