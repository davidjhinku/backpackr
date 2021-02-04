import {
    ADD_USER,
    RECEIVE_USER_ERROR
} from '../actions/users_actions'

const UserErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    debugger
    switch(action.type) {
        case RECEIVE_USER_ERROR:
            return action.errors
        case ADD_USER:
            return []
        default:
            return state;
    }
}

export default UserErrorsReducer;