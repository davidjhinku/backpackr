import React from 'react';
import CommentDetails from './comment_details';
import CreateCommentContainer from './create_comment_container';

class Comments extends React.Component {
    
    render() {
        const commentsList = this.props.comments.map((comment, idx) => {
            return <CommentDetails key={`comment-${idx}`} comment={comment} deleteComment={this.props.deleteComment} />
        })

        return (
            <div className="comments-container">
                <ul>
                    {commentsList}
                    <br />
                </ul>

                <div className="create-comment-container">
                    <CreateCommentContainer />
                </div>
            </div>
        )
    }
}

export default Comments;