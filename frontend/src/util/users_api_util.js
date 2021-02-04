import axios from 'axios';

export const addUserToTrip = data => {
    return axios.post(`/api/trips/${data.tripId}/user`, data)
}

export const removeUserFromTrip = data => {
    return axios.delete(`/api/trips/${data.tripId}/user/${data.userId}`, data)
}