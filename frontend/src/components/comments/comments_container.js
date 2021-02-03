import { connect } from 'react-redux';
import { 
    fetchComments,
    deleteComment,
    receiveErrors } 
from '../../actions/comment_actions';
import Comments from './comments';

const mSTP = (state, ownProps) => {
    return {
        currentUser: state.session.user
    }
}

const mDTP = dispatch => {
    return {
        fetchComments: () => dispatch(fetchComments()),
        deleteComment: commentId => dispatch(deleteComment(commentId)),
        clearErrors: errors => dispatch(receiveErrors(errors))
    }
}

export default connect(mSTP, mDTP)(Comments);