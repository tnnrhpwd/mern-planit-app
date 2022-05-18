import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'      // useDispatch-brings in reset,register,login from state
import { createComment, deleteComment } from '../../features/comments/commentSlice'
import './PlanPreview.css';

function PlanPreview(props) {
    const [ comment, setComment ] = useState("")
    const [ commentComponentArray, setCommentComponentArray ] = useState("")
    const [ commentTime, setCommentTime ] = useState('')

    const dispatch = useDispatch();  // initialization



    const offsetMultiplier = 1.5;
    const plan = props.planIdentity;
    const yOffset = props.screenY * offsetMultiplier + 50;

    const importedComments = props.planIDComments;

    useEffect(() => {
        setCommentTime(plan.updatedAt)

        function handleOutputComments(){
            var outputArray = [];
            var deleteButton = "";
            importedComments.forEach(( selComment, commentIndex ) => {
                if("selComment.user"==="selComment.user"){
                    deleteButton = ""
                }

                if(selComment.comment) {
                    outputArray.push(<>
                        <div key={comment._id} className='planpreview-window-comments-result'>

                            <div key={selComment._id+"1"} className='planpreview-window-comments-result-comment'>{selComment.comment}</div>
                            <div key={selComment._id+"2"} className='planpreview-window-comments-result-time'>{selComment.updatedAt}</div>
                            <button onClick={() => dispatch(deleteComment(selComment._id))} key={selComment._id+"0"} className='planpreview-window-comments-result-delete'>Delete Comment</button>
                        </div>
                    </>)
                }
            });
            setCommentComponentArray(outputArray)
        }

        handleOutputComments()
    }, [importedComments, plan.updatedAt])
    




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
                    {plan.goal} {commentTime}
                </div>
                <div className='planpreview-window-close'>
                    <button onClick={props.handlePlanPreviewClose}>Close</button>
                </div>
                <div className='planpreview-window-plan'>
                    {plan.plan}
                </div>
                <form onSubmit={onSubmit}>
                    <div className='planpreview-window-addcomment'>
                        <textarea
                            type='plan'
                            name='plan'
                            className='planpreview-window-addcomment-input'
                            placeholder='Enter comment here.'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}   // change text field value
                        />
                        <button className='planpreview-window-addcomment-submit' type='submit'>
                            Submit Comment ❤
                        </button>
                    </div>
                </form>
                <div className='planpreview-window-comments'>

                    {commentComponentArray}
                </div>
            </div>
        </div>
    )
}

export default PlanPreview