import React from 'react'
import {withRouter} from 'react-router-dom'

class CreateTripForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            destination: '',
            tripName: '',
            startDate: '',
            endDate: '',
            users: [],
            comments: [],
            itineraryItems: [],
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({errors: nextProps.errors})
    }

    handleChange(field) {
        return e => {
            this.setState({[field]: e.target.value});
        }
    }

    
    handleSubmit(e) {
        e.preventDefault();
        let trip = {
            destination: this.state.destination,
            tripName: this.state.tripName,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            users: this.state.users,
            comments: this.state.comments,
            itinerary_item: this.state.itineraryItems,
        };

        this.props.createTrip(trip)
        .then(returnedTrip => {
            debugger
            if (returnedTrip.type === "RECEIVE_TRIP_ERRORS") return;
            this.props.history.push(`/trips/${returnedTrip.trip.data._id}`);
        });
    }
    
    componentWillUnmount() {
        this.props.clearErrors([])
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, idx) => (
                    <li className='create-trip-errors-element' key={`err-${idx}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        )
    }

    render() {

        return (
            <div className='create-trip-container'>

                <div className="create-trip-form-container">
                    <div className='create-trip-header'>
                        <h3>Create a Trip!</h3>
                    </div>
                    <div className="create-trip-errors">
                        {this.renderErrors()}
                    </div>

                    <form onSubmit={this.handleSubmit} className="create-trip-form">
                        <div>
                            <input className='create-trip-input-element'
                                type="text"
                                value={this.state.tripName}
                                onChange={this.handleChange('tripName')}
                                placeholder='Trip Name'
                                />
                        </div>
                    
                        <div>
                            <input className='create-trip-input-element'
                                type="text"
                                value={this.state.destination}    
                                onChange={this.handleChange('destination')}
                                placeholder='Destination'
                            />
                        </div>

                        <input className='create-trip-date-element'
                            type="date"
                            value={this.state.startDate}
                            onChange={this.handleChange('startDate')}
                        />
                        <input className='create-trip-date-element'
                            type="date"
                            value={this.state.endDate}
                            onChange={this.handleChange('endDate')}
                        />

                        {/* <div className="create-trip-submit-btn"> */}
                            <input className="create-trip-submit-text" type="submit" value="Create Trip" />
                        {/* </div> */}
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(CreateTripForm);