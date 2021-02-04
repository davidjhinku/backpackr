import {
    RECEIVE_USER_TRIPS,
    RECEIVE_A_TRIP,
    RECEIVE_NEW_TRIP,
    REMOVE_TRIP
} from '../actions/trip_actions'

const defaultState = {
    user: {},
    trip: {},
    new: undefined
}

const TripsReducer = (state = defaultState, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
        case RECEIVE_USER_TRIPS:
            newState.user = {};
            // Turn this array into an object with keys as id's.
            action.trips.data.forEach(trip => {
                newState.user[trip._id] = trip;
            });
            return newState;
            return newState;
        case RECEIVE_A_TRIP:
            newState.trip = action.trip.data;
            return newState;
        case RECEIVE_NEW_TRIP:
            newState.new = action.trip.data;
            return newState;
        case REMOVE_TRIP:
            delete newState.user[action.tripId]
            return newState;
        default:
            return state;
    }
}

export default TripsReducer;