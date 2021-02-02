import {connect} from 'react-redux';
import {createTrip, receiveErrors} from '../../actions/trip_actions'
import CreateTripForm from './create_trip_form'

const mSTP = (state, ownProps) => {
    return {
        errors: state.errors.trip
    }
}

const mDTP = dispatch => {
    return {
        createTrip: data => dispatch(createTrip(data)),
        clearErrors: errors => dispatch(receiveErrors(errors))
    }
}

export default connect(mSTP, mDTP)(CreateTripForm);