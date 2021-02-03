import axios from 'axios';

export const fetchAllItineraryItems = () => {
    return axios.get(`/api/itineraryitems/`)
};
export const fetchItineraryItem = (itemId) => {
    return axios.get(`/api/itineraryitems/${itemId}`)
};

export const createItineraryItem = (data) => {
    debugger
    return axios.post(`/api/trips/${data.tripId}/itineraryItem`, data);
}

// export const updateItineraryItem = (data) => {
//     return axios.patch(`/api/itineraryitems/${data.id}`, data);
// } //unsure of data.id 

export const deleteItineraryItem = (itemId) => {
    return axios.delete(`api/itineraryitems/${itemId}`)
}