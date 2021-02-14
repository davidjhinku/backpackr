import axios from 'axios';

export const fetchAllLodgingItineraryItems = () => {
    return axios.get(`/api/lodgingitineraryitems/`)
};
export const fetchItineraryItem = (itemId) => {
    return axios.get(`/api/lodgingitineraryitems/${itemId}`)
};

export const createItineraryItem = (data) => {
    return axios.post(`/api/trips/${data.tripId}/lodgingItineraryItem`, data);
}

// export const updateItineraryItem = (data) => {
//     return axios.patch(`/api/lodgingitineraryitems/${data.id}`, data);
// } 

export const deleteItineraryItem = (itemId) => {
    return axios.delete(`/api/trips/lodgingItineraryItems/${itemId}`)
}