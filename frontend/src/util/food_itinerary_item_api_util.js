import axios from 'axios';

export const fetchAllFoodItineraryItems = () => {
    return axios.get(`/api/fooditineraryitems/`)
};
export const fetchItineraryItem = (itemId) => {
    return axios.get(`/api/fooditineraryitems/${itemId}`)
};

export const createItineraryItem = (data) => {
    return axios.post(`/api/trips/${data.tripId}/foodItineraryItem`, data);
}

// export const updateItineraryItem = (data) => {
//     return axios.patch(`/api/fooditineraryitems/${data.id}`, data);
// } 

export const deleteItineraryItem = (itemId) => {
    return axios.delete(`/api/trips/foodItineraryItems/${itemId}`)
}