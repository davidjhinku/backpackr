import * as APIUtil from '../util/trip_api_util'

export const RECEIVE_USER_TRIPS = 'RECEIVE_USER_TRIPS';
export const RECEIVE_A_TRIP = 'RECEIVE_A_TRIP';
export const RECEIVE_NEW_TRIP = 'RECEIVE_NEW_TRIP';

export const receiveUserTrips = trips => ({
    type: RECEIVE_USER_TRIPS,
    trips
});

export const receiveATrip = trip => ({
    type: RECEIVE_A_TRIP,
    trip
})

export const receiveNewTrip = trip => ({
    type: RECEIVE_NEW_TRIP,
    trip
});

export const fetchUserTrips = userId => dispatch => (
    APIUtil.fetchAllTrips(userId)
        .then(trips => dispatch(receiveUserTrips(trips)))
        .catch(err => console.log(err))
);

export const fetchATrip = tripId => dispatch => (
    APIUtil.fetchTrip(tripId)
        .then(trip => dispatch(receiveATrip(trip)))
        .catch(err => console.log(err))
)

export const createTrip = data => dispatch => (
    createTrip(data)
        .then(trip => dispatch(receiveNewTrip(trip)))
        .catch(err => console.log(err))
);