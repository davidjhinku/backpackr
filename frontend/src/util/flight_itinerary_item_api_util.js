import axios from 'axios';

export const fetchAllFlightItineraryItems = () => {
    return axios.get(`/api/flightitineraryitems/`)
};
export const fetchItineraryItem = (itemId) => {
    return axios.get(`/api/flightitineraryitems/${itemId}`)
};

export const createItineraryItem = (data) => {
    return axios.post(`/api/trips/${data.tripId}/flightItineraryItem`, data);
}

// export const updateItineraryItem = (data) => {
//     return axios.patch(`/api/flightitineraryitems/${data.id}`, data);
// } 

export const deleteItineraryItem = (itemId) => {
    debugger
    return axios.delete(`/api/trips/flightItineraryItems/${itemId}`)
}