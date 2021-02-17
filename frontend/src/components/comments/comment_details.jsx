import React from 'react'

class CommentDetails extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            mounted: false
        }
    }
    componentDidMount(){
        this.props.fetchComment(this.props.comment.id)
        this.setState({mounted: true})
    }

    render () {
        if (!this.state.mounted){
            return(
                <div>
                    Loading...
                </div>
            )
        } else {
            const deleteButton = (this.props.comment.author._id === this.props.currentUser.id) ? <button className="comment-delete-btn" onClick={() => this.props.deleteComment(this.props.comment._id)}>Delete Comment</button> : "";
    
            const messageClass = ((this.props.idx) % 2 === 0)? "message-bubble-1" : "message-bubble-2";

            return (<div className='comment-list' >
                <li className={messageClass}>
                    <section>
                        <div className="comment-text-user">
                            {this.props.comment.author.username}
                            <br />
                        </div>
                        <div className="comment-test-date">
                            {new Date(this.props.comment.date).toDateString()}
                            <br />
                        </div>
                        <div className="comment-test-time">
                            {new Date(this.props.comment.date).toLocaleTimeString()}
                            <br />
                        </div>
                        <div className="comment-text-body">
                            <p>{this.props.comment.comment}</p>
                        </div>
                    </section>
    
                    <div>
                        <br />
                        {deleteButton}
                    </div>
                </li>
                <br />
            </div>
            )
        }
    }
};

export default CommentDetails;
