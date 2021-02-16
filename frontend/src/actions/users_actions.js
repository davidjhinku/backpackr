import * as UsersAPIUtil from '../util/users_api_util'

export const ADD_USER = 'RECEIVE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const RECEIVE_USER_ERROR = 'RECEIVE_USER_ERROR';

export const receiveUser = user => ({
    type: ADD_USER,
    user
})

export const removeUser = user => {
    return {
        type: REMOVE_USER,
        user
    }
}

export const receiveErrors = errors => {
    return {
        type: RECEIVE_USER_ERROR,
        errors
    }
}

export const addUserToTrip = user => dispatch => {
    return UsersAPIUtil.addUserToTrip(user)
        .then(user => {
            return dispatch(receiveUser(user))})
        .catch(err => {
            return dispatch(receiveErrors(err.response.data))})
}

export const removeUserFromTrip = user => dispatch => {
    return UsersAPIUtil.removeUserFromTrip(user)
        .then(user => {
            return dispatch(removeUser(user))})
        .catch(err => {
            return dispatch(receiveErrors(err.response.data))})
}