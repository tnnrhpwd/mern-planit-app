import { useDispatch } from 'react-redux'                         // useDispatch-brings in methods from state wihtout prop drilling
import { deletePlan } from '../../features/plans/planSlice'
import './PlanResult.css';

function PlanResult({ plan }) {
  const dispatch = useDispatch()  // initialization

  return (
    <div className='planit-planresult'>
      <div>{new Date(plan.createdAt).toLocaleString('en-US')}</div>
      <h2>{plan.text}</h2>
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