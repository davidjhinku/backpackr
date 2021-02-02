import { connect } from 'react-redux';
import Profile from './profile';
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);