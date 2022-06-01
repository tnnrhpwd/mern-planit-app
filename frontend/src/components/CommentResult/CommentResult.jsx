import React from 'react'

function CommentResult(props) {
    if(props.comment.comment){
        return (
            <div className='commentresult'>
                {props.comment.comment}
            </div>
        )
    }

}

export default CommentResult