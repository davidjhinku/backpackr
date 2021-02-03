// still need to:
// 1) map through comments
// 2) create separate comment input form
// 3) access author & datetime for comment display

import React from 'react'

class Chats extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username:"",
            comment:"",
            date:"",
            errors:{}
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
            username: this.state.username,
            comment: this.state.comment,
            date: this.state.timestamp,
        };

        // this.props.createComment(comment)
        //     // .then(returnedComment=> {
        //         // this.props.history.push(`/trips/${ownProps.match.params.trip.data._id}/comments`); need help with this
        //     // });
    }

    componentWillUnmount(){
        this.props.clearErrors([])
    }

    // renderErrors(){
    //     return (
    //         <ul>
    //             {Object.keys(this.state.errors).map((error, idx) => (
    //                 <li className='create-trip-errors-element' key={`err-${idx}`}>
    //                     {this.state.errors[error]}
    //                 </li>
    //             ))}
    //         </ul>
    //     )
    // }


    render(){

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


                        {/* <div className="create-trip-errors">
                            {this.renderErrors()}
                        </div> */}

                        <div className="create-trip-submit-btn">
                            <input className="create-trip-submit-text" type="submit" value="Create Trip" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Chats;