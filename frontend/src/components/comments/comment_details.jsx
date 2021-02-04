import React from 'react'

class CommentDetails extends React.Component{

    render () {
        const messageClass = ((this.props.idx) % 2 === 0)?"message-bubble-1" : "message-bubble-2"
        debugger
        return (<div className='comment-list' >
            <li className={messageClass}>

                {this.props.comment.author.username}
                <br />
                {new Date(this.props.comment.date).toDateString()}
                <br />
                {new Date(this.props.comment.date).toLocaleTimeString()}
                <br />
                <br />
                <p>{this.props.comment.comment}</p>
                <br />

                <br />
                <button onClick={() => this.props.deleteComment(this.props.comment.author._id.id)}>Delete Comment</button>
            </li>
            <br />
        </div>
        )
    }
};

export default CommentDetails;
