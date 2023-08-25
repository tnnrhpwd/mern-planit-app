import { useState } from 'react'
import { useDispatch } from 'react-redux'      // useDispatch-brings in reset,register,login from state
import { toast } from 'react-toastify'                        // visible error notifications
// import { createData } from './../../features/data/dataSlice'
import './GoalInput.css';

function GoalInput() {
    const [text, setText] = useState('')

    const dispatch = useDispatch()  // initialization

    const onSubmit = (e) => {
        e.preventDefault()

        // dispatch(createData({ text }))   // dispatch connects to the store, then creates a goal with text input
        setText('')                      // empty text field 
        toast.success("Goal successfully created!", { autoClose: 1000 })
    }

    return (
        <div className='planit-goalinput'>
            <form onSubmit={onSubmit}>
                <div className='planit-goalinput-group'>
                <input
                    type='text'
                    name='text'
                    id='planit-goalinput-input'
                    placeholder='Enter goal for others to solve.'
                    value={text}
                    onChange={(e) => setText(e.target.value)}   // change text field value
                />
                </div>
                <div className='planit-goalinput-group'>
                <button className='planit-goalinput-submit' type='submit'>
                    Create Goal
                </button>
                </div>
            </form>
        </div>
    )
}

export default GoalInput