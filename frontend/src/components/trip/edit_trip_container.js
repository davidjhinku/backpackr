import React from 'react'
import { connect } from 'react-redux';
import {fetchATrip, updateTrip, receiveErrors} from '../../actions/trip_actions'
import EditTripForm from './edit_trip_form'

class EditTrip extends React.Component {
    componentDidMount(){
        debugger
        this.props.fetchATrip(this.props.match.params.tripId)
    }

    render() {
        const props = this.props
        debugger
        if (!props.trip) {
            return null;
        } else {
            return(
                <EditTripForm trip={props.trip}
                    formType={props.formType}
                    updateTrip={props.updateTrip}
                />
            )
        }
    }
}



const mSTP = (state, ownProps) => {
    debugger
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