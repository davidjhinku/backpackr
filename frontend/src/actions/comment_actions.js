import * as CommentAPIUtil from '../util/comment_api_util'

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

export const removeComment = commentId => {
    return {
        type: REMOVE_COMMENT,
        commentId
    }
}

export const fetchComments = () => dispatch => (
    CommentAPIUtil.fetchAllComments()
        .then(comments => dispatch(receiveAllComments(comments)))
        .catch(err => dispatch(receiveErrors(err)))
)
export const fetchComment = commentId => dispatch => (
    CommentAPIUtil.fetchComment(commentId)
        .then(comment => dispatch(receiveComment(comment)))
        .catch(err => dispatch(receiveErrors(err)))
)

export const createComment = data => dispatch => {
    return CommentAPIUtil.createComment(data)
        .then(comment => {
            return dispatch(receiveNewComment(comment.data))})
        .catch(err => {
            return dispatch(receiveErrors(err))})
};

export const updateComment = data => dispatch => {
    return CommentAPIUtil.updateComment(data)
        .then(comment => dispatch(receiveComment(comment)))
        .catch(err => dispatch(receiveErrors(err)))
}

export const deleteComment = commentId => dispatch => {
    return CommentAPIUtil.deleteComment(commentId)
        .then(commentId => dispatch(removeComment(commentId)))
}