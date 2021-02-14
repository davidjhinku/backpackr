import { connect } from 'react-redux';
import { createItineraryItem, receiveErrors } from '../../actions/flight_itinerary_item_actions'
import {fetchATrip} from '../../actions/trip_actions'
import CreateFlightItineraryItem from './create_flight_itinerary_item'

const mSTP = (state, ownProps) => {
    return {
        currentUser: state.session.user,
        errors: state.errors.itineraryItem,
        tripId: Object.keys(state.trips.trip)[0]
    }
}

const mDTP = dispatch => {
    return {
        createItineraryItem: data => dispatch(createItineraryItem(data)),
        fetchATrip: tripId => dispatch(fetchATrip(tripId)),
        clearErrors: errors => dispatch(receiveErrors(errors))
    }
}

export default connect(mSTP, mDTP)(CreateFlightItineraryItem);