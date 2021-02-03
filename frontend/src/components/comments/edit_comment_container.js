import { connect } from 'react-redux';
import {
    fetchComment,
    updateComment,
    receiveErrors
}
    from '../../actions/comment_actions';
import EditComment from './edit_comment';

const mSTP = (state, ownProps) => {
    const comment = state.comments.comment
    return {
        currentUser: state.session.user,
        comment: comment
    }
}

const mDTP = dispatch => {
    return {
        fetchComment: commentId => dispatch(fetchComment(commentId)),
        updateComment: data => dispatch(updateComment(data)),
        clearErrors: errors => dispatch(receiveErrors(errors))
    }
}

export default connect(mSTP, mDTP)(EditComment);