import React from 'react'


const CommentDetails = ({ comment, deleteComment }) => {
    return (
        <div className='itinerary-item-list' >
            <li>
                <p>{comment.comment}</p>
                <br />

                <button onClick={() => deleteComment(comment._id)}>Delete Comment</button>
            </li>
            <br />
        </div>
    )
}

export default CommentDetails;
