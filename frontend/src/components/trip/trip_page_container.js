import { connect } from 'react-redux';
import { fetchATrip } from '../../actions/trip_actions'
import TripPage from './trip_page'

const mSTP = (state, ownProps) => {
    debugger
    return {
        tripId: ownProps.match.params.tripId,
        trip: state.trips[tripId]
    }
}

const mDTP = dispatch => {
    debugger
    return {
        fetchATrip: tripId => dispatch(fetchATrip(tripId))
    }
}

export default connect(mSTP, mDTP)(TripPage);