import {connect} from 'react-redux';
import {createTrip} from '../../actions/trip_actions'
import CreateTrip from './create_trip'

mSTP = (state, ownProps) => {
    return {
        currentUser: state.session.user
    }
}

mDTP = dispatch => {
    return {
        createTrip: data => dispatch(createTrip(data))
    }
}