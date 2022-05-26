import { useDispatch } from 'react-redux'      // access state variables
import { deletePlan } from '../../features/plans/planSlice'
import CreatedAt from './CreatedAt';
import './PlanResult.css';

function PlanResult(props) {
  const dispatch = useDispatch()  // initialization
  const plan = props.plan
  var user = false;
  if(props.user){
    user = props.user
  }


  return (
    <div className='planit-planresult'>
      {/* <div>{new Date(plan.createdAt).toLocaleString('en-US')}</div> */}
      <div>{ <CreatedAt createdAt={plan.createdAt}/> }</div>
      <a href={'plan/'+plan._id}><h2>{plan.goal}</h2></a>
      <a href={'plan/'+plan._id}><h3>{plan.plan}</h3></a>
      <h5>Agrusers: {plan.agrusers}</h5>
      <h5>Disusers: {plan.disusers}</h5>

      { (user._id === plan.user) &&
            <button onClick={() => dispatch(deletePlan(plan._id))} className='planit-planresult-delete'>
            Delete Plan
          </button>
      }
    </div>
  )
}

export default PlanResult