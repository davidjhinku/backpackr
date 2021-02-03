import { RECEIVE_CHAT_ERRORS, RECEIVE_COMMENT } from '../actions/comment_actions'

const _nullErrors = [];

const CommentErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CHAT_ERRORS:
            return action.errors;
        case RECEIVE_COMMENT:
            return _nullErrors;
        default:
            return state;
    }
};

export default CommentErrorsReducer;