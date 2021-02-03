import React from 'react'
import { connect } from 'react-redux';
import { fetchItineraryItem, receiveErrors } from '../../actions/itinerary_item_actions'
// import { fetchItineraryItem, updateItineraryItem, receiveErrors } from '../../actions/itinerary_item_actions'
import EditItineraryItem from './edit_itinerary_item'

class EditItem extends React.Component {
    componentDidMount() {
        this.props.fetchItineraryItem(this.props.match.params.itemId)
    }

    render() {

        if (!this.props.item) {
            return null;
        } else {
            return (
                <EditItineraryItem
                    item={this.props.item}
                    // updateItineraryItem={this.props.updateItineraryItem}
                    clearErrors={this.props.clearErrors}
                />
            )
        }
    }
}



const mSTP = (state, ownProps) => {
    return {
        trip: state.items.item[ownProps.match.params.itemId],
        errors: state.errors.item,
        formType: 'Update your Itinerary Item'
    }
}

const mDTP = dispatch => {
    return {
        fetchItineraryItem: itemId => dispatch(fetchItineraryItem(itemId)),
        updateItineraryItem: data => dispatch(updateItineraryItem(data)),
        clearErrors: errors => dispatch(receiveErrors(errors))
    }
}

export default connect(mSTP, mDTP)(EditItineraryItem);