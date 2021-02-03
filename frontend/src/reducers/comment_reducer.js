import { 
    RECEIVE_ALL_COMMENTS, 
    RECEIVE_COMMENT, 
    RECEIVE_NEW_COMMENT 
    REMOVE_COMMENT
} from '../actions/chat_actions'

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
        default:
            return state;
    }
}

export default ItemsReducer;