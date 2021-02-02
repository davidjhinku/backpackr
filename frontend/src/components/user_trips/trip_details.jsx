import React from 'react';
import {Link} from 'react-router-dom'

class TripDetails extends React.Component {
    render() {
        const trip = this.props.trip

        return (
            <li className="trip-card">
                <h2>{trip.tripName}</h2>
                <h3>{trip.destination}</h3>
                <p>{`${trip.startDate} - ${trip.endDate}`}</p>
                <div>
                    <Link to={`trips/${trip._id}/edit`} trip={trip}>Edit</Link>
                    {/* LINKS TO UPDATE AND DELETE */}
                </div>
                <br/>
            </li>
        );
    }
}

export default TripDetails;