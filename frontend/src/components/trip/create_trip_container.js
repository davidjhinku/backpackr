import {connect} from 'react-redux';
import {createTrip} from '../../actions/trip_actions'
import CreateTrip from './create_trip'

const mSTP = (state, ownProps) => {
    return {
        currentUser: state.session.user,
        errors: state.errors.trip
    }
}

const mDTP = dispatch => {
    return {
        createTrip: data => dispatch(createTrip(data))
    }
}

export default connect(mSTP, mDTP)(CreateTrip);