import { connect } from 'react-redux';
import { addUserToTrip, removeUserFromTrip } from '../../actions/users_actions'
import UsersList from './users_list'

const mSTP = (state, ownProps) => {
    return {
        tripId: Object.keys(state.trips.trip)[0],
        errors: state.errors.user
    }
}

const mDTP = dispatch => {
    return {
        addUserToTrip: user => dispatch(addUserToTrip(user)),
        removeUserFromTrip: user => dispatch(removeUserFromTrip(user))
    }
}

export default connect(mSTP, mDTP)(UsersList);