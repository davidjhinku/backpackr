import { connect } from 'react-redux';
import { fetchItineraryItem } from '../../actions/itinerary_item_actions';
import ItineraryItem from './itinerary_item';


const mSTP = (state, ownProps) => { 
    const itemId = ownProps.match.params.itemId
    debugger
    const item = state.items.item
    return {
        itemId: itemId,
        item: item
    }
}

const mDTP = dispatch => { 
    return { 
        fetchItineraryItem: itemId => dispatch(fetchItineraryItem(itemId))
    }
}


export default connect(mSTP, mDTP)(ItineraryItem)