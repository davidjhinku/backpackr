import React from 'react'
import { connect } from 'react-redux';
import {fetchATrip, updateTrip, receiveErrors} from '../../actions/trip_actions'
import EditTripForm from './edit_trip_form'

class EditTrip extends React.Component {
    componentDidMount(){
        this.props.fetchATrip(this.props.match.params.tripId)
    }

    render() {
        const props = this.props

        if (!props.trip) {
            return null;
        } else {
            return(
                <EditTripForm trip={props.trip}
                    formType={props.formType}
                    updateTrip={props.updateTrip}
                    clearErrors={props.clearErrors}
                />
            )
        }
    }
}



const mSTP = (state, ownProps) => {
    return {
        trip: state.trips.trip[ownProps.match.params.tripId],
        errors: state.errors.trip,
        formType: 'Update your Trip!'
    }
}

const mDTP = dispatch => {
    return {
        fetchATrip: tripId => dispatch(fetchATrip(tripId)),
        updateTrip: data => dispatch(updateTrip(data)),
        clearErrors: errors => dispatch(receiveErrors(errors))
    }
}

export default connect(mSTP, mDTP)(EditTrip);