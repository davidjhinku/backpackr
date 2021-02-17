import React from 'react';
import {Link} from 'react-router-dom'

class TripDetails extends React.Component {
    render() {
        const trip = this.props.trip
        debugger
        return (
            <li className="trip-card">
                <div>
                    <div className="trip-name">
                        <h2 className='trip-details-color'><Link to={`trips/${trip._id}`} >{trip.tripName}</Link></h2>
                    </div>

                    <div className='trip-details'>
                        <p className='trip-details-color'>Destination: {trip.destination}</p>
                        <p className='trip-details-color'>Dates: {`${trip.startDate.slice(0,10)} - ${trip.endDate.slice(0,10)}`}</p>
                    </div>
                </div>

                <div className='user-trip-links'>
                    <Link className="edit-trip" to={`trips/${trip._id}/edit`} trip={trip}>Edit This Trip</Link>
                    <button className="delete-trip" onClick={() => this.props.deleteTrip(trip._id)}>Delete This Trip</button>
                </div>
            </li>
        );
    }
}

export default TripDetails;