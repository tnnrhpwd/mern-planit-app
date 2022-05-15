import { useState } from 'react'
import { useDispatch } from 'react-redux'      // useDispatch-brings in reset,register,login from state
import { createPlan } from '../../features/plans/planSlice'
import './PlanInput.css';

function PlanInput() {
    const [plan, setPlan] = useState('')
    const [goal, setGoal] = useState('')

    const dispatch = useDispatch()  // initialization

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createPlan({ plan,goal }))   // dispatch connects to the store, then creates a plan with text input
        setPlan('')                      // empty plan field
        setGoal('')                      // empty goal field
    }

    return (
        <div className='planit-planinput'>
            <form onSubmit={onSubmit}>
                <div className='planit-planinput-group'>
                    <input
                        type='goal'
                        name='goal'
                        id='planit-planinput-input'
                        placeholder='Enter Goal'
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}   // change text field value
                    />
                    <input
                        type='plan'
                        name='plan'
                        id='planit-planinput-input'
                        placeholder='Enter Plan'
                        value={plan}
                        onChange={(e) => setPlan(e.target.value)}   // change text field value
                    />
                </div>
                <div className='planit-planinput-group'>
                    <button className='planit-planinput-submit' type='submit'>
                        Add ✔
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PlanInput