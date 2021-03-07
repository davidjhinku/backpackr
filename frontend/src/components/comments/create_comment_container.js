import { connect } from 'react-redux';
import {
    createComment
}
    from '../../actions/comment_actions';
import CreateComment from './create_comment';

const mSTP = (state, ownProps) => {
    return {
        currentUser: state.session.user,
        tripId: Object.keys(state.trips.trip)[0],
        errors: state.errors
    }
}

const mDTP = dispatch => {
    return {
        createComment: data => dispatch(createComment(data))
    }
}

export default connect(mSTP, mDTP)(CreateComment);