import {
    RECEIVE_ALL_LODGING_ITINERARY_ITEMS,
    RECEIVE_LODGING_ITINERARY_ITEM,
    RECEIVE_NEW_LODGING_ITINERARY_ITEM,
    REMOVE_ITEM
} from '../actions/lodging_itinerary_item_actions'
import { RECEIVE_A_TRIP } from '../actions/trip_actions';

const defaultState = {
    lodgingItem: {},
    new: undefined
}

const LodgingItemsReducer = (state = defaultState, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_A_TRIP:
            
            const brandNewState = {};
            Object.values(action.trip.data)[0].itineraryItems
                .forEach(ii => { brandNewState[ii._id] = ii });
            return brandNewState;

        case RECEIVE_ALL_LODGING_ITINERARY_ITEMS:
            return action.items
        case RECEIVE_LODGING_ITINERARY_ITEM:
            return action.item.data;
        case RECEIVE_NEW_LODGING_ITINERARY_ITEM:
            newState[action.item.data._id] = action.item.data;
            return newState;
        case REMOVE_ITEM:
            delete newState[action.itemId]
            return newState;
        default:
            return state;
    }
}

export default LodgingItemsReducer;