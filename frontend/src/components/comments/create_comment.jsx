import React from 'react';

class CreateComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            author: this.props.currentUser,
            comment: "",
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
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let comment = {
            author: this.state.author,
            comment: this.state.comment,
            tripId: this.props.tripId,
        };

        this.props.createComment(comment)
            .then(this.setState({
                author: this.props.currentUser,
                comment: "",
            }));
    }

    // componentWillUnmount() {
    //     this.props.clearErrors([])
    // }

    // renderErrors(){
    //     return (
    //         <ul>
    //             {Object.keys(this.props.errors).map((error, idx) => (
    //                 <li className='create-comment-errors-element' key={`err-${idx}`}>
    //                     {this.props.errors[error]}
    //                 </li>
    //             ))}
    //         </ul>
    //     )
    // }


    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                    <div className='create-comment-subcontainer'>

                            <input 
                                className='comments-input-element'
                                type="text"
                                value={this.state.comment}
                                onChange={this.handleChange('comment')}
                                placeholder='Write your comment here'
                            />
                            <br />

                        {/* <div className="create-comment-errors">
                            {this.renderErrors()}
                        </div> */}

                            <img className="create-comment-submit-btn" alt="submit-comment-btn" onClick={this.handleSubmit} src="https://i.ibb.co/th9QxJw/comment-submit.png" />
                    </div>
                </form>
        )
    }
}

export default CreateComment;