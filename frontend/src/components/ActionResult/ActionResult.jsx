import './ActionResult.css';

function ActionResult(props) {
  return (<>
    <div className='actionresult'>
      {props.selAction[2][0][0][1]}
    </div>
  </>)
}

export default ActionResult