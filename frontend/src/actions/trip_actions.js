import {} from '' //to import from the trip util folder

export const RECEIVE_USER_TRIPS = 'RECEIVE_USER_TRIPS';
export const RECEIVE_NEW_TRIP = 'RECEIVE_NEW_TRIP';

export const receiveUserTrips = trips => ({
    type: RECEIVE_USER_TRIPS,
    trips
});

export const receiveNewTrip = trip => ({
    type: RECEIVE_NEW_TRIP,
    trip
});

export const fetchUserTrips = id => dispatch => (
    fetchUsetTrips(id)
        .then(trips => dispatch(receiveUserTrips(trips)))
        .catch(err => console.log(err))
);

export const createTrip = data => dispatch => (
    createTrip(data)
        .then(trip => dispatch(receiveNewTrip(trip)))
        .catch(err => console.log(err))
);