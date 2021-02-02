import { connect } from 'react-redux';
import { fetchATrip } from '../../actions/trip_actions'
import TripPage from './trip_page'

const mSTP = (state, ownProps) => {
    debugger
    const tripId = ownProps.match.params.tripId
    const trip = state.trips.trip[tripId]
    debugger
    return {
        tripId: tripId,
        trip: trip
    }
}

const mDTP = dispatch => {
    debugger
    return {
        fetchATrip: tripId => dispatch(fetchATrip(tripId))
    }
}

export default connect(mSTP, mDTP)(TripPage);