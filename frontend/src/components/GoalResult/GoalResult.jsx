import { useDispatch } from 'react-redux'                         // useDispatch-brings in methods from state wihtout prop drilling
import { deleteGoal } from './../../features/goals/goalSlice'
import './GoalResult.css';

function GoalResult({ goal }) {
  const dispatch = useDispatch()  // initialization

  return (
    <div className='planit-goalresult'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <a href='/plans'>
        <button className='planit-goalresult-plan'>
          Create Plan!
        </button>
      </a>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='planit-goalresult-delete'>
        Delete Goal
      </button>
    </div>
  )
}

export default GoalResult