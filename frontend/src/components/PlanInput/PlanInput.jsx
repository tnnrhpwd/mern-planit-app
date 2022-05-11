import { useState } from 'react'
import { useDispatch } from 'react-redux'      // useDispatch-brings in reset,register,login from state
import { createPlan } from '../../features/plans/planSlice'
import './PlanInput.css';

function PlanInput() {
    const [textState, setTextState] = useState({
        textGoal: "",
        textPlan: "",

    })

    const dispatch = useDispatch()  // initialization

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createPlan({ textState }))   // dispatch connects to the store, then creates a plan with text input
        setTextState('')                      // empty text field
    }

    return (
        <div className='planit-planinput'>
            <form onSubmit={onSubmit}>
                <div className='planit-planinput-group'>
                <input
                    type='text'
                    name='text'
                    id='planit-planinput-input'
                    placeholder='Enter Goal'
                    value={textState.textGoal}
                    onChange={(e) => setTextState(e.target.value)}   // change text field value
                />
                <input
                    type='text'
                    name='text'
                    id='planit-planinput-input'
                    placeholder='Enter Plan'
                    value={textState.textPlan}
                    onChange={(e) => setTextState(e.target.value)}   // change text field value
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