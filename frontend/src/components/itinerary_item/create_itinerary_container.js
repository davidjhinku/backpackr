import { connect } from 'react-redux';
import { createItineraryItem, receiveErrors } from '../../actions/itinerary_item_actions'
import CreateItineraryItem from './create_itinerary_item'

const mSTP = (state, ownProps) => {
    return {
        currentUser: state.session.user,
        errors: state.errors.itineraryItem
    }
}

const mDTP = dispatch => {
    return {
        createItineraryItem: data => dispatch(createItineraryItem(data)),
        clearErrors: errors => dispatch(receiveErrors(errors))
    }
}

export default connect(mSTP, mDTP)(CreateItineraryItem);