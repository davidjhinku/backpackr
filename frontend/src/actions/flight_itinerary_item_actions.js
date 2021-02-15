import * as ItemAPIUtil from '../util/flight_itinerary_item_api_util'

export const RECEIVE_ALL_FLIGHT_ITINERARY_ITEMS = 'RECEIVE_ALL_FLIGHT_ITINERARY_ITEMS';
export const RECEIVE_FLIGHT_ITINERARY_ITEM = 'RECEIVE_FLIGHT_ITINERARY_ITEM';
export const RECEIVE_NEW_FLIGHT_ITINERARY_ITEM = 'RECEIVE_NEW_FLIGHT_ITINERARY_ITEM';
export const RECEIVE_FLIGHT_ITINERARY_ITEM_ERRORS = 'RECEIVE_FLIGHT_ITINERARY_ITEM_ERRORS';
export const REMOVE_ITEM = 'REMOVE_ITEM';


export const receiveAllFlightItineraryItems = items => ({
    type: RECEIVE_ALL_FLIGHT_ITINERARY_ITEMS,
    items
})

export const receiveItineraryItem = item => ({
    type: RECEIVE_FLIGHT_ITINERARY_ITEM,
    item
})

export const receiveNewItineraryItem = item => ({
    type: RECEIVE_NEW_FLIGHT_ITINERARY_ITEM,
    item
});

export const receiveErrors = errors => ({
    type: RECEIVE_FLIGHT_ITINERARY_ITEM_ERRORS,
    errors
});

export const removeItem = itemId => {
    return {
        type: REMOVE_ITEM,
        itemId
    }
}


export const fetchAllFlightItineraryItems = () => dispatch => (
    ItemAPIUtil.fetchAllFlightItineraryItems()
        .then(items => dispatch(receiveAllFlightItineraryItems(items)))
        .catch(err => dispatch(receiveErrors(err)))
)
export const fetchItineraryItem = itemId => dispatch => (
    ItemAPIUtil.fetchItineraryItem(itemId)
        .then(item => dispatch(receiveItineraryItem(item)))
        .catch(err => dispatch(receiveErrors(err)))
)

export const createItineraryItem = data => dispatch => {
    return ItemAPIUtil.createItineraryItem(data)
        .then(item => {
            return dispatch(receiveNewItineraryItem(item))})
        .catch(err => {
            return dispatch(receiveErrors(err))})
};

export const deleteFlightItem = itemId => dispatch => {
    debugger
    return ItemAPIUtil.deleteItineraryItem(itemId)
        .then(item => {
            debugger
            return dispatch(removeItem(itemId))})
        .catch(err => {
            debugger
            return dispatch(receiveErrors(err))})
}