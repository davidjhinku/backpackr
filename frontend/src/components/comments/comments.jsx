import React from 'react';
import CommentDetailsContainer from './comment_details_container';
import CreateCommentContainer from './create_comment_container';

class Comments extends React.Component {
    
    render() {
        const commentsList = this.props.comments.map((comment, idx) => { 
            return <CommentDetailsContainer idx={idx + 1} key={`err-${idx}`}comment={comment} />
        })


        return (
            <div>
                <ul className="comments-subcontainer">
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