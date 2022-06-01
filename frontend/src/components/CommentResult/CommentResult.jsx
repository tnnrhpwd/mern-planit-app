import CreatedAt from "../PlanResult/CreatedAt"
import './CommentResult.css';

function CommentResult(props) {
    if(props.comment.comment){
        return (
            <div className='commentresult'>
                <div className='commentresult-time'>
                    <CreatedAt createdAt={props.comment.createdAt}/>
                </div>
                <div className='commentresult-comment'>
                    {props.comment.comment}
                </div>

            </div>
        )
    }

}

export default CommentResult