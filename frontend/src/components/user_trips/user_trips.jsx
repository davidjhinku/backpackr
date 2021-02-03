import React from 'react';
import TripDetails from './trip_details'
import {Link} from 'react-router-dom'

class UserTrips extends React.Component {
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
        return (
          <div>
            <h1>You don't have any trips planned yet!</h1>
            <Link to='/trips/create'>Create a new trip</Link>
          </div>)
      } else {
        // debugger
        return (
          <div className='users-trip-page'>
            <div className='users-trip-subcontainer'>

              <div className="users-trip-header">
                <h1>My Trips</h1>
              </div>
              <ul className='users-trip-container'>
                {this.state.trips.map(trip => (
                  <TripDetails key={trip._id} trip={trip} deleteTrip={this.props.deleteTrip}/>
                ))}
              </ul>

              <br/>
              <Link to='/trips/create'>Create a new trip</Link>

            </div>
          </div>
        )
      }
    }
}

export default UserTrips;