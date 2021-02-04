import React from 'react'

class CommentDetails extends React.Component{

    render () {
        const messageClass = ((this.props.idx) % 2 === 0)?"message-bubble-1" : "message-bubble-2"

        return (<div className='itinerary-item-list' >
            <li className={messageClass}>
                {new Date(this.props.comment.date).toDateString()}
                <br />
                {new Date(this.props.comment.date).toLocaleTimeString()}
                <p>{this.props.comment.comment}</p>
                <br />

                <br />
                <button onClick={() => this.props.deleteComment(this.props.comment._id)}>Delete Comment</button>
            </li>
            <br />
        </div>
        )
    }
};

export default CommentDetails;
