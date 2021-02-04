import React from 'react';
import {Link} from 'react-router-dom'

class TripDetails extends React.Component {
    render() {
        const trip = this.props.trip

        return (
            <li className="trip-card">
                <div className="trip-name">
                    <h2><Link to={`trips/${trip._id}`} >{trip.tripName}</Link></h2>
                </div>

                <div className='trip-details'>
                    <p>Destination: {trip.destination}</p>
                    <p>Dates: {`${trip.startDate.slice(0,10)} - ${trip.endDate.slice(0,10)}`}</p>
                    <div>
                        <Link className="edit-trip" to={`trips/${trip._id}/edit`} trip={trip}>Edit This Trip</Link>
                        <br/>
                        <button className="delete-trip" onClick={() => this.props.deleteTrip(trip._id)}>Delete This Trip</button>
                    </div>
                </div>
                <br/>
            </li>
        );
    }
}

export default TripDetails;