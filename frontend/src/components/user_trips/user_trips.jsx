import React from 'react';
import TripDetails from './trip_details'
import {Link} from 'react-router-dom'

class UserTrips extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentWillMount() {
        console.log(this.props.currentUser.id)
        this.props.fetchUserTrips(this.props.currentUser.id);
    }
    
    render() {
      if (this.props.trips.length === 0) {
        return (  
          <div className='no-trip-page'>
            <div className="no-trip-container">
              <h1>You don't have any trips planned yet!</h1>
              <div className='no-trip-create-btn-container'>
                <Link className="no-trip-create-btn" to='/trips/create'>Create a new trip</Link>
              </div>
            </div>
          </div>)
      } else {
        debugger
        return (
          <div className='users-trip-page'>
            <div className="user-trips-nav-border"></div>
            <div className='users-trip-container'>

              <div className="users-trip-header">
                <h1>My Trips</h1>
              </div>

              <ul className='users-trip-subcontainer'>
                {this.props.trips.map(trip => (
                  <TripDetails key={trip._id} trip={trip} deleteTrip={this.props.deleteTrip}/>
                ))}
                <Link className="new-trip-btn" to='/trips/create'>Create a new trip</Link>
              </ul>

              <br/>

            </div>
          </div>
        )
      }
    }
}

export default UserTrips;