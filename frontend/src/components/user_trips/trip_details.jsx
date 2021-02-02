import React from 'react';

class TripDetails extends React.Component {
    render() {
        debugger
        return (
            <li className="trip-card">
                <h3>{this.props.tripName}</h3>
                <p>{this.props.description}</p>
            </li>
        );
    }
}

export default TripDetails;