import {
    ADD_USER,
    REMOVE_USER
} from '../actions/users_actions'

const UsersReducer = (state = [], action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case ADD_USER:
            return action.user
        case REMOVE_USER:
            delete newState[action.userId]
            return newState
        default:
            return state;
    }
}

export default UsersReducer