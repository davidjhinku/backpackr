import { connect } from 'react-redux';
import UserTrips from './user_trips';
import { fetchUserTrips, deleteTrip } from '../../actions/trip_actions'

const mapStateToProps = (state) => {
  return {
    trips: Object.values(state.trips.user),
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserTrips: userId => dispatch(fetchUserTrips(userId)),
    deleteTrip: tripId => dispatch(deleteTrip(tripId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTrips);