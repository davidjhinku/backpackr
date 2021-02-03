import React from 'react'
import { withRouter } from 'react-router-dom'

class EditTripForm extends React.Component {
    constructor(props) {
        super(props)
        const trip = this.props.trip
        this.state = {
            destination: trip.destination,
            tripName: trip.tripName,
            startDate: trip.startDate.slice(0,10),
            endDate: trip.endDate.slice(0,10),
            users: trip.users,
            comments: trip.comments,
            itineraryItems: trip.itineraryItems,
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
        let trip = {
            id: this.props.trip._id,
            destination: this.state.destination,
            tripName: this.state.tripName,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            users: this.state.users,
            comments: this.state.comments,
            itinerary_item: this.state.itineraryItems,
        };

        this.props.updateTrip(trip)
            .then(returnedTrip => {
                debugger
                this.props.history.push(`/trips/${this.props.match.params.tripId}`);
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
        debugger
        return (
            <div className='edit-trip-container'>
                <h3>Update your Trip</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className='edit-trip-subcontainer'>

                        <div>
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
                </form>
            </div>
        )
    }
}

export default withRouter(EditTripForm);