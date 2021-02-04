import { connect } from 'react-redux';
import { deleteComment } from '../../actions/comment_actions';
import CommentDetails from './comment_details';

const mSTP = (state, ownProps) => {
    return {
    }
}

const mDTP = dispatch => {
    return {
        deleteComment: commentId => dispatch(deleteComment(commentId))
    }
}

export default connect(mSTP, mDTP)(CommentDetails);