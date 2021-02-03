//these routes need to be updated

import axios from 'axios';

export const fetchAllComments = () => {
    return axios.get(`/api/trip/{tripId}/comments/`) 
};
export const fetchComment = (commentId) => {
    return axios.get(`/api/trip/{tripId}/comments/`)
};

export const createComment = (data) => {
    return axios.get(`/api/trip/{tripId}/comments/`) 
};

export const updateComment = (commentId) => {
    return axios.get(`/api/trip/{tripId}/comments/`)
};

export const deleteComment = (commentId) => {
    return axios.get(`/api/trip/{tripId}/comments/`)
};