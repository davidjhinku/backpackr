import axios from 'axios';

export const addUserToTrip = data => {
    debugger
    return axios.post(`/api/trips/${data.tripId}/user`, data)
}

export const removeUserFromTrip = data => {
    debugger
    return axios.post(`/api/trips/${data.tripId}/user/${data.userId}`, data)
}