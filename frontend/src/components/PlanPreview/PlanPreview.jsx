import { useState } from 'react';
import { useDispatch } from 'react-redux'      // useDispatch-brings in reset,register,login from state
import { createComment } from '../../features/comments/commentSlice'
import './PlanPreview.css';

function PlanPreview(props) {
    const [comment, setComment] = useState("")

    const dispatch = useDispatch();  // initialization



    const offsetMultiplier = 1.5;
    const plan = props.planIdentity;
    const yOffset = props.screenY * offsetMultiplier + 50;

    const importedComments = props.planIDComments;

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createComment({ plan, comment }))
        setComment('')                      // empty comment field
    }

    return (
        <div className='planpreview'>
            <div className='planpreview-window'
                style={{marginTop: yOffset}}
                >
                <div className='planpreview-window-goal'>
                    {plan.goal}
                </div>
                <div className='planpreview-window-close'>
                    <button onClick={props.handlePlanPreviewClose}>Close</button>
                </div>
                <div className='planpreview-window-plan'>
                    {plan.plan}
                </div>
                <form onSubmit={onSubmit}>
                    <div className='planpreview-window-comments'>
                        <textarea
                            type='plan'
                            name='plan'
                            className='planpreview-window-comments-input'
                            placeholder='Enter comment here.'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}   // change text field value
                        />
                        <button className='planpreview-window-comments-submit' type='submit'>
                            Submit Comment ❤
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PlanPreview