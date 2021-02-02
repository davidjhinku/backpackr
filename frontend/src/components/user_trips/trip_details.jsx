import React from 'react';

class TripDetails extends React.Component {
    render() {
        debugger
        const trip = this.props.trip

        return (
            <li className="trip-card">
                <h2>{trip.tripName}</h2>
                <h3>{trip.destination}</h3>
                <p>{`${trip.startDate} - ${trip.endDate}`}</p>
                <br/>
            </li>
        );
    }
}

export default TripDetails;