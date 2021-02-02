import { connect } from 'react-redux';
import UserTrips from './user_trips';
import { fetchUserTrips } from '../../actions/trip_actions'

const mapStateToProps = (state) => {
  return {
    trips: Object.values(state.trips.user),
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserTrips: userId => dispatch(fetchUserTrips(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTrips);