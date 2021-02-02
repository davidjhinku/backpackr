import * as ItemAPIUtil from '../util/trip_api_util'

export const RECEIVE_ALL_ITINERARY_ITEM = 'RECEIVE_ALL_ITINERARY_ITEM';
export const RECEIVE_ITINERARY_ITEM = 'RECEIVE_ITINERARY_ITEM';
export const RECEIVE_NEW_ITINERARY_ITEM = 'RECEIVE_NEW_ITINERARY_ITEM';
export const RECEIVE_ITINERARY_ITEM_ERRORS = 'RECEIVE_ITINERARY_ITEM_ERRORS'


export const receiveAllItineraryItems = () => ({
    type: RECEIVE_A_TRIP,
    items
})

export const receiveItineraryItem = item => ({
    type: RECEIVE_A_TRIP,
    item
})

export const receiveNewItineraryItem = item => ({
    type: RECEIVE_NEW_ITINERARY_ITEM,
    item
});

export const receiveErrors = errors => ({
    type: RECEIVE_ITINERARY_ITEM_ERRORS,
    errors
});


export const fetchAllItineraryItems = () => dispatch => (
    ItemAPIUtil.fetchAllItineraryItems()
        .then(items => dispatch(receiveAllItineraryItems(items)))
        .catch(err => dispatch(receiveErrors(err)))
)
export const fetchItineraryItem = itemId => dispatch => (
    ItemAPIUtil.fetchItineraryItem(itemId)
        .then(item => dispatch(receiveItineraryItem(item)))
        .catch(err => dispatch(receiveErrors(err)))
)

export const createItineraryItem = data => dispatch => (
    ItemAPIUtil.createItineraryItem(data)
        .then(item => dispatch(receiveNewItineraryItem(item)))
        .catch(err => dispatch(receiveErrors(err)))
);