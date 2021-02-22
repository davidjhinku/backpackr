import React from 'react'
import { withRouter } from 'react-router-dom'

class EditComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            author: "",
            comment: "",
            date: "",
            // errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({ errors: nextProps.errors })
    // }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
            // this.props.clearErrors([]);
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        let comment = {
            id: this.props.comment._id,
            author: this.state.author,
            comment: this.state.comment,
            date: this.state.timestamp,
        };

        this.props.updateComment(comment)
            .then(fetchedItem => {
                this.props.history.push(`/comments/${this.props.match.params.commentId}`);
            });
    }

    // componentWillUnmount() {
    //     this.props.clearErrors([])
    // }

    // renderErrors() {
    //     return (
    //         <ul>
    //             {Object.keys(this.state.errors).map((error, idx) => (
    //                 <li className='create-item-errors-element' key={`err-${idx}`}>
    //                     {this.state.errors[error]}
    //                 </li>
    //             ))}
    //         </ul>
    //     )
    // }

    render() {

        return (
            <div className='edit-comment-container'>
                <form onSubmit={this.handleSubmit}>
                    <div className='edit-comment-box'>

                        <div>
                            <input className='edit-comment-input'
                                type="text"
                                value={this.state.item_name}
                                onChange={this.handleChange('comment')}
                            />
                            <br />
                        </div>

                        {/* <div className="create-item-errors">
                            {this.renderErrors()}
                        </div> */}

                        <div className="edit-comment-submit-btn">
                            <input className="edit-comment-submit-text" type="submit" value="Update Comment" />
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(EditComment);