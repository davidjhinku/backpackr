import { connect } from 'react-redux';
import { fetchComment, deleteComment, fetchComments } from '../../actions/comment_actions';
import CommentDetails from './comment_details';

const mSTP = (state, ownProps) => {
    return {
        currentUser: state.session.user
    }
}

const mDTP = dispatch => {
    return {
        fetchComment: commentId => dispatch(fetchComment(commentId)),
        deleteComment: commentId => dispatch(deleteComment(commentId))
    }
}

export default connect(mSTP, mDTP)(CommentDetails);