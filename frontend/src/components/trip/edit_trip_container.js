import { connect } from 'react-redux';

const mSTP = (state, ownProps) => {
    return {
        currentUser: state.session.user,
        errors: state.errors.trip
    }
}

const mDTP = dispatch => {
    return {
        createTrip: data => dispatch(createTrip(data)),
        clearErrors: errors => dispatch(receiveErrors(errors))
    }
}

export default connect(mSTP, mDTP)(EditTrip);