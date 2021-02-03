import { connect } from 'react-redux';
import {
    createComment,
    receiveErrors
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
    debugger
    return {
        
        createComment: data => dispatch(createComment(data)),
        clearErrors: errors => dispatch(receiveErrors(errors))
    }
}

export default connect(mSTP, mDTP)(CreateComment);