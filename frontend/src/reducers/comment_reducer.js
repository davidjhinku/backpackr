import { 
    RECEIVE_ALL_COMMENTS, 
    RECEIVE_COMMENT, 
    RECEIVE_NEW_COMMENT, 
    REMOVE_COMMENT
} from '../actions/comment_actions'
import { RECEIVE_A_TRIP, RECEIVE_NEW_TRIP } from '../actions/trip_actions';

const defaultState = {
    comment:{},
    new: undefined
}

const CommentsReducer = (state = defaultState, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_A_TRIP:
            const _newState = {}; // All previous comments need to be deleted.
            Object.values(action.trip.data)[0].comments
                .forEach( comment => { _newState[comment._id] = comment });
            return _newState;

        case RECEIVE_ALL_COMMENTS:
            return action.comments
        case RECEIVE_COMMENT:
            return action.comment.data;
        case RECEIVE_NEW_COMMENT:
            const test = {};
            newState[action.comment._id] = action.comment;
            return newState;
        case REMOVE_COMMENT:
            delete newState[action.commentId.data._id];
            return newState;
        default:
            return state;
    }
}

export default CommentsReducer;