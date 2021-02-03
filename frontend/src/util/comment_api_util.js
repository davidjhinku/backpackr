import axios from 'axios';

export const fetchAllComments = () => {
    return axios.get(`/api/comments/`) 
};
export const fetchComment = (commentId) => {
    return axios.get(`/api/comments/${commentId}`)
};

export const createComment = (data) => {
    return axios.post(`/api/trips/${data.tripId}/comment/`, data) 
};

export const updateComment = (data) => {
    return axios.patch(`/api/comments/${data.id}`, data)
};

export const deleteComment = (commentId) => {
    return axios.delete(`/api/comments/${commentId}`)
};