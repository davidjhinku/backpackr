import { connect } from 'react-redux';
import { fetchATrip } from '../../actions/trip_actions';
import {deleteItem} from '../../actions/itinerary_item_actions';
import {deleteFlightItem} from '../../actions/flight_itinerary_item_actions';
import TripPage from './trip_page'

const mSTP = (state, ownProps) => {
    const tripId = ownProps.match.params.tripId
    const trip = state.trips.trip
    
    return {
        tripId: tripId,
        trip: Object.values(trip)[0],
        comments: state.comments,
        itineraryItems: state.items,
        flightItineraryItems: state.flightItems
    }
}

const mDTP = dispatch => {
    return {
        fetchATrip: tripId => dispatch(fetchATrip(tripId)),
        deleteItem: itemId => dispatch(deleteItem(itemId)),
        deleteFlightItem: itemId => dispatch(deleteFlightItem(itemId))
    }
}

export default connect(mSTP, mDTP)(TripPage);