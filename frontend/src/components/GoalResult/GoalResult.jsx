import { useState } from 'react';
import { useDispatch } from 'react-redux'                         // useDispatch-brings in methods from state wihtout prop drilling
import { updateGoal } from './../../features/goals/goalSlice'
import ShareView from '../ShareView/ShareView.jsx'
import { toast } from 'react-toastify'                        // visible error notifications
import CreatedAt from '../PlanResult/CreatedAt';
import { useNavigate } from 'react-router-dom';
import ThumbsUp from './../../assets/thumbs-up.svg';
import ThumbsDown from './../../assets/thumbs-down.svg';
import ManageView from '../ManageView/ManageView';
import './GoalResult.css';

function GoalResult( props ) {
  const dispatch = useDispatch()  // initialization
  const navigate = useNavigate();

  const [ shareView, setShareView ] = useState(null);
  const [ manageView, setManageView ] = useState(null);

  const goal = props.goal
  const comments = props.comments

  var user = false;
  if( props.user ){ user = props.user }

  return (
    <div className='planit-goalresult'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <a href='/plans'>
        <button className='planit-goalresult-plan'>
          Create Plan!
        </button>
      </a>
    </div>
  )
}

export default GoalResult