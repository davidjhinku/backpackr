import { connect } from 'react-redux';
import { fetchATrip } from '../../actions/trip_actions'
import UsersList from './users_list'

const mSTP = (state, ownProps) => {
    return {
    }
}

const mDTP = dispatch => {
    return {
        fetchATrip: tripId => dispatch(fetchATrip(tripId))
    }
}

export default connect(mSTP, mDTP)(UsersList);