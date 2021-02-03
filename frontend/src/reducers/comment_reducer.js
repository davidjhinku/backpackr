import { 
    RECEIVE_ALL_COMMENTS, 
    RECEIVE_COMMENT, 
    RECEIVE_NEW_COMMENT, 
    REMOVE_COMMENT
} from '../actions/chat_actions'

const defaultState = {
    comment: {},
    new: undefined
}

const CommentsReducer = (state = defaultState, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ALL_COMMENTS:
            return action.comments
        case RECEIVE_COMMENT:
            return action.comment.data;
        case RECEIVE_NEW_COMMENT:
            newState.new = action.comment.data;
            return newState;
        case REMOVE_COMMENT:
            delete newState[action.commentId]
            return newState;
        default:
            return state;
    }
}

export default CommentsReducer;