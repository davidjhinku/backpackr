import * as APIUtil from '../util/trip_api_util'

export const RECEIVE_USER_TRIPS = 'RECEIVE_USER_TRIPS';
export const RECEIVE_A_TRIP = 'RECEIVE_A_TRIP';
export const RECEIVE_NEW_TRIP = 'RECEIVE_NEW_TRIP';
export const RECEIVE_TRIP_ERRORS = 'RECEIVE_TRIP_ERRORS'
export const REMOVE_TRIP = 'REMOVE_TRIP'

export const receiveUserTrips = trips => ({
    type: RECEIVE_USER_TRIPS,
    trips
});

export const receiveATrip = trip => {
    return {
        type: RECEIVE_A_TRIP,
        trip
    }
}

export const receiveNewTrip = trip => ({
    type: RECEIVE_NEW_TRIP,
    trip
});

export const receiveErrors = errors => ({
    type: RECEIVE_TRIP_ERRORS,
    errors
});

export const removeTrip = tripId => {
    return {
        type:REMOVE_TRIP,
        tripId
    }
}

export const fetchUserTrips = userId => dispatch => (
    APIUtil.fetchAllTrips(userId)
        .then(trips => dispatch(receiveUserTrips(trips)))
        .catch(err => dispatch(receiveErrors(err)))
);

export const fetchATrip = tripId => dispatch => (
    APIUtil.fetchTrip(tripId)
        .then(trip => {
            // debugger
            return dispatch(receiveATrip(trip))})
        .catch(err => dispatch(receiveErrors(err)))
)

export const createTrip = data => dispatch => {
    return APIUtil.createTrip(data)
        .then(trip => dispatch(receiveNewTrip(trip)))
        .catch(err => dispatch(receiveErrors(err)))
}

export const updateTrip = data => dispatch => {
    return APIUtil.updateTrip(data)
        .then(trip => dispatch(receiveATrip(trip)))
        .catch(err => dispatch(receiveErrors(err)))
}

export const deleteTrip = tripId => dispatch => {
    return APIUtil.deleteTrip(tripId)
        .then(trip => dispatch(removeTrip(tripId)));
}