import axios from 'axios';

export const addUserToTrip = data => {
    return axios.post(`/api/trips/${data.tripId}/user`)
}

export const removeUserFromTrip = data => {
    return axios.post(`/api/trips/${data.tripId}/user/${data.userId}`)
}