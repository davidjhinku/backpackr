import React from 'react'
import {withRouter} from 'react-router-dom'

class CreateTrip extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            destination: '',
            trip_name: '',
            start_date: '',
            end_date: '',
            users: [],
            comments: [],
            itinerary_items: [],
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
            this.props.clearErrors([]);
        }
    }

    
    handleSubmit(e) {
        debugger
        e.preventDefault();
        let trip = {
            destination: this.state.destination,
            trip_name: this.state.trip_name,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            users: this.state.users,
            comments: this.state.comments,
            itinerary_item: this.state.itinerary_items,
        };

        debugger
        this.props.createTrip(trip)
        // .then(this.props.history.push(`/trips/${trip._id}`))
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
                <h3>Create a Trip!</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className='create-trip-subcontainer'>
                        
                        <div>
                            <input className='create-trip-input-element'
                                type="text"
                                value={this.state.trip_name}
                                onChange={this.handleChange('trip_name')}
                                placeholder='Trip Name'
                            />
                            <br />
                        </div>                        
                        
                        <div>
                            <input className='create-trip-input-element'
                                type="text"
                                value={this.state.destination}    
                                onChange={this.handleChange('destination')}
                                placeholder='Destination'
                            />
                            <br/>
                        </div>

                        <div>
                            <input className='create-trip-date-element'
                                type="date"
                                value={this.state.start_date}
                                onChange={this.handleChange('start_date')}
                            />
                        </div>
                            <input className='create-trip-date-element'
                                type="date"
                                value={this.state.end_date}
                                onChange={this.handleChange('end_date')}
                            />
                        <div>

                        </div>

                        <div className="create-trip-errors">
                            {this.renderErrors()}
                        </div>

                        <div className="create-trip-submit-btn">
                            <input className="create-trip-submit-text" type="submit" value="Create Trip" />
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(CreateTrip);