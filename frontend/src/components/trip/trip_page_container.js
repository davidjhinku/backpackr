import { connect } from 'react-redux';
import { fetchATrip } from '../../actions/trip_actions'
import {deleteItem} from '../../actions/itinerary_item_actions'
import TripPage from './trip_page'

const mSTP = (state, ownProps) => {
    const tripId = ownProps.match.params.tripId
    const trip = state.trips.trip
    // debugger
    return {
        tripId: tripId,
        trip: Object.values(trip)[0]
    }
}

const mDTP = dispatch => {
    return {
        fetchATrip: tripId => dispatch(fetchATrip(tripId)),
        deleteItem: itemId => dispatch(deleteItem(itemId))
    }
}

export default connect(mSTP, mDTP)(TripPage);