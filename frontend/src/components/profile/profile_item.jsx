import React from 'react';

class ProfileItem extends React.Component {
    render() {
        return (
            <div className="trip-card">
                <h3>{this.props.tripName}</h3>
                <p>{this.props.description}</p>
            </div>
        );
    }
}

export default ProfileItem;