import { useSelector, useDispatch } from 'react-redux'      // access state variables
import { deletePlan } from '../../features/plans/planSlice'
import Spinner from './../../components/Spinner/Spinner.jsx'
import { getPlans, resetPlanSlice } from './../../features/plans/planSlice'
import './PlanResult.css';

function PlanResult({ plan }) {
  const dispatch = useDispatch()  // initialization

  const { goals, isLoading, isError, message } = useSelector(     // select plan values from plan state
    (state) => state.goals
  )

  return (
    <div className='planit-planresult'>
      <div>{new Date(plan.createdAt).toLocaleString('en-US')}</div>
      <h2>{plan.goal}</h2>
      <h3>{plan.plan}</h3>
      <h5>Agrusers: {plan.agrusers}</h5>
      <h5>Disusers: {plan.disusers}</h5>
      <a href='/plans'>
        <button className='planit-planresult-plan'>
          Create Plan!
        </button>
      </a>
      <button onClick={() => dispatch(deletePlan(plan._id))} className='planit-planresult-delete'>
        Delete Plan
      </button>
    </div>
  )
}

export default PlanResult