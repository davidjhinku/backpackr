import React from 'react';
import {Link} from 'react-router-dom'

class TripDetails extends React.Component {
    render() {
        const trip = this.props.trip

        return (
            <li className="trip-card">
                <h2><Link to={`trips/${trip._id}`} >{trip.tripName}</Link></h2>
                <p>Destination: {trip.destination}</p>
                <p>Dates: {`${trip.startDate.slice(0,10)} - ${trip.endDate.slice(0,10)}`}</p>
                <div>
                    <Link to={`trips/${trip._id}/edit`} trip={trip}>Edit This Trip</Link>
                    <br/>
                    <button onClick={() => this.props.deleteTrip(trip._id)}>Delete This Trip</button>
                </div>
                <br/>
            </li>
        );
    }
}

export default TripDetails;