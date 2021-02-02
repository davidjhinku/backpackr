import React from 'react';
import ProfileItem from './profile_item'


class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
          trips: []
        }
    }
    
    componentWillMount() {
        console.log(this.props.currentUser.id)
        this.props.fetchUserTrips(this.props.currentUser.id);
    }

    componentWillReceiveProps(newState) {
        this.setState({ trips: newState.trips });
    }   
    
    render() {
      if (this.state.trips.length === 0) {
        return (<div>You don't have any trips planned yet!</div>)
      } else {
        return (
          <div>
            <h1>My Trips</h1>
            {this.state.trips.map(trip => (
              <ProfileItem key={trip._id} tripName={trip.tripName} destination={trip.destination} />
            ))}
          </div>
        )
      }
    }
}

export default Profile;