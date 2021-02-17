import React from 'react'
import { withRouter } from 'react-router-dom'

class EditTripForm extends React.Component {
    constructor(props) {
        super(props)
        const trip = this.props.trip
        this.state = this.props.trip
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({ errors: nextProps.errors })
    }

    handleChange(field) {
        return e => {
            this.setState({ [field]: e.target.value });
            this.props.clearErrors([]);
        }
    }


    handleSubmit(e) {
        e.preventDefault();

        this.props.updateTrip(this.state)
            .then(returnedTrip => {
                // this.props.history.push(`/trips/${this.props.match.params.tripId}`);
                this.props.history.push(`/profile`);
            });
    }

    componentWillUnmount() {
        this.props.clearErrors([])
    }

    // renderErrors() {
    //     return (
    //         <ul>
    //             {Object.keys(this.state.errors).map((error, idx) => (
    //                 <li className='edit-trip-errors-element' key={`err-${idx}`}>
    //                     {this.state.errors[error]}
    //                 </li>
    //             ))}
    //         </ul>
    //     )
    // }

    render() {
        return (
            <div className='edit-trip-container'>
                <form onSubmit={this.handleSubmit}>
                    <div className='edit-trip-subcontainer'>
                        <div className="edit-trip-form">
                            <div>

                                <div className='create-trip-header'>
                                    <h3>Update your Trip!</h3>
                                </div>
                                <input className='edit-trip-input-element'
                                    type="text"
                                    value={this.state.tripName}
                                    onChange={this.handleChange('tripName')}
                                    placeholder='Trip Name'
                                />
                                <br />
                            </div>

                            <div>
                                <input className='edit-trip-input-element'
                                    type="text"
                                    value={this.state.destination}
                                    onChange={this.handleChange('destination')}
                                    placeholder='Destination'
                                />
                                <br />
                            </div>

                            <div>
                                <input className='edit-trip-date-element'
                                    type="date"
                                    value={this.state.startDate}
                                    // value='2020-10-05'
                                    onChange={this.handleChange('startDate')}
                                />
                            </div>
                            <input className='edit-trip-date-element'
                                type="date"
                                value={this.state.endDate}
                                onChange={this.handleChange('endDate')}
                            />
                            <div>

                            </div>

                            {/* <div className="edit-trip-errors">
                                {this.renderErrors()}
                            </div> */}

                            <div className="edit-trip-submit-btn">
                                <input className="edit-trip-submit-text" type="submit" value="Update Trip" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(EditTripForm);