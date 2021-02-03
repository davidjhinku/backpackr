// still need to:
// 1) map through comments

import React from 'react';
import { withRouter } from 'react-router-dom';

class CreateComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            author: this.props.currentUser,
            comment: "",
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.errors })
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
            this.props.clearErrors([]);
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        let comment = {
            author: this.state.author,
            comment: this.state.comment,
        };

        
        this.props.createComment(comment)
            .then(comment => {
                debugger
                
                this.setState({
                    author: this.props.currentUser,
                    comment: "",
                    errors: {}
                })
            })
    }

    componentWillUnmount() {
        this.props.clearErrors([])
    }

    renderErrors(){
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, idx) => (
                    <li className='create-comment-errors-element' key={`err-${idx}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        )
    }


    render() {

        return (
            <div className='comments-container'>
                <h3>Comments</h3>


                <form onSubmit={this.handleSubmit}>
                    <div className='comments-subcontainer'>

                        <div>
                            <input className='comments-input-element'
                                type="text"
                                value={this.state.comment}
                                onChange={this.handleChange('comment')}
                                placeholder='Write your comment here!'
                            />
                            <br />
                        </div>

                        <div className="create-comment-errors">
                            {this.renderErrors()}
                        </div>

                        <div className="create-trip-submit-btn">
                            <input className="create-trip-submit-text" type="submit" value="Create Comment" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateComment;