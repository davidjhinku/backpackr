import * as ChatAPIUtil from '../util/chat_api_util'

export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_NEW_COMMENT = 'RECEIVE_NEW_COMMENT';
export const RECEIVE_CHAT_ERRORS = 'RECEIVE_CHAT_ERRORS';
export const REMOVE_COMMENT = "REMOVE_COMMENT";


export const receiveAllComments = comments => ({
    type: RECEIVE_ALL_COMMENTS,
    comments
})

export const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
})

export const receiveNewComment = comment => ({
    type: RECEIVE_NEW_COMMENT,
    comment
});

export const receiveErrors = errors => ({
    type: RECEIVE_CHAT_ERRORS,
    errors
});

export const removeTrip = commentId => {
    return {
        type: REMOVE_COMMENT,
        commentId
    }
}

export const fetchComments = () => dispatch => (
    ChatAPIUtil.fetchAllComments()
        .then(comments => dispatch(receiveAllComments(comments)))
        .catch(err => dispatch(receiveErrors(err)))
)
export const fetchComment = commentId => dispatch => (
    ChatAPIUtil.fetchComment(commentId)
        .then(comment => dispatch(receiveComment(comment)))
        .catch(err => dispatch(receiveErrors(err)))
)

export const createComment = data => dispatch => (
    ChatAPIUtil.createComment(data)
        .then(comment => dispatch(receiveNewComment(comment)))
        .catch(err => dispatch(receiveErrors(err)))
);

export const updateComment = data => dispatch => {
    return ChatAPIUtil.updateComment(data)
        .then(comment => dispatch(receiveComment(comment)))
        .catch(err => dispatch(receiveErrors(err)))
}

export const deleteTrip = tripId => dispatch => {
    return ChatAPIUtil.deleteComment(tripId)
        .then(trip => dispatch(removeTrip(trip.id)))
}