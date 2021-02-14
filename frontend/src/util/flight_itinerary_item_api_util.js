import axios from 'axios';

export const fetchAllFlightItineraryItems = () => {
    return axios.get(`/api/flightitineraryitems/`)
};
export const fetchItineraryItem = (itemId) => {
    return axios.get(`/api/flightitineraryitems/${itemId}`)
};

export const createItineraryItem = (data) => {
    return axios.post(`/api/trips/${data.tripId}/flightitineraryItem`, data);
}

export const updateItineraryItem = (data) => {
    return axios.patch(`/api/flightitineraryitems/${data.id}`, data);
} //unsure of data.id 

export const deleteItineraryItem = (itemId) => {
    return axios.delete(`/api/trips/flightitineraryItems/${itemId}`)
}