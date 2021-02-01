import axios from 'axios';

export const fetchAllTrips = (userId) => {
    return axios.get(`/api/trips/user/${userId}`)
};
export const fetchTrip = (tripId) => {
    return axios.get(`/api/trips/${tripId}`)
};

export const createTrip = (data) => { 
    return axios.post('/api/trips/', data);
}

// export const updateTrip = (data) => { 
//     return axios.patch(`/api/trips/${data.id}`, data);
// } //unsure of data.id 

export const deleteTrip = (tripId) => { 
    return axios.delete(`api/trips/${tripId}`)
}