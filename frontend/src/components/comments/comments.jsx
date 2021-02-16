import React from 'react';
import CommentDetailsContainer from './comment_details_container';
import CreateCommentContainer from './create_comment_container';

class Comments extends React.Component {
    constructor(props) { 
        super(props);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.mRef = React.createRef();
    }


    componentDidMount() { 
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => { 
        this.mRef.current.scrollIntoView({block:"end"})
    }


    render() {
        const commentsList = this.props.comments.map((comment, idx) => { 
            return <CommentDetailsContainer idx={idx + 1} key={`err-${idx}`}comment={comment} />
        })


        return (
            <div>
                <div className="comments-wrapper">
                    <ul className="comments-subcontainer">
                        {commentsList}
                        <div ref={this.mRef}></div>
                        <br />
                    </ul>
            </div>
                <div className="comments-subcontainer-anchor"></div>

                <div className="create-comment-container">
                    <CreateCommentContainer />
                </div>
            </div>
        )
    }
}

export default Comments;