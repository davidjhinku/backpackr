import { connect } from 'react-redux';
import {updateTrip, receiveErrors} from '../../actions/trip_actions'
import TripForm from './edit_trip_form'

const mSTP = (state, ownProps) => {
    debugger
    return {
        trip: state.trips.user.trips[ownProps.match.params.tripId],
        errors: state.errors.trip,
        formType: 'Update your Trip!'
    }
}

const mDTP = dispatch => {
    return {
        updateTrip: data => dispatch(updateTrip(data)),
        clearErrors: errors => dispatch(receiveErrors(errors))
    }
}

export default connect(mSTP, mDTP)(TripForm);