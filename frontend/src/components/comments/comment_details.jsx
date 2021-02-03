import React from 'react'


const CommentDetails = ({ comment, deleteComment }) => {
   
    return (
        <div className='itinerary-item-list' >
            <li>
                {new Date(comment.date).toDateString()}
                <br />
                {new Date(comment.date).toLocaleTimeString()}
                <p>{comment.comment}</p>
                <br />
                
                <br />
                <button onClick={() => deleteComment(comment._id)}>Delete Comment</button>
            </li>
            <br />
        </div>
    )
}

export default CommentDetails;
