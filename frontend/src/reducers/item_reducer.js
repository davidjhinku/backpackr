import {
    RECEIVE_ALL_ITINERARY_ITEMS,
    RECEIVE_ITINERARY_ITEM,
    RECEIVE_NEW_ITINERARY_ITEM,
    REMOVE_ITEM
} from '../actions/itinerary_item_actions'

const defaultState = {
    item: {},
    new: undefined
}

const ItemsReducer = (state = defaultState, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ALL_ITINERARY_ITEMS:
            return action.items
        case RECEIVE_ITINERARY_ITEM:
            return action.item.data;
        case RECEIVE_NEW_ITINERARY_ITEM:
            newState.new = action.item.data;
            return newState;
        case REMOVE_ITEM:
            delete newState[action.itemId]
            return newState;
        default:
            return state;
    }
}

export default ItemsReducer;