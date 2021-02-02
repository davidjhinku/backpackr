import {RECEIVE_TRIP_ERRORS, RECEIVE_A_TRIP} from '../actions/trip_actions'

const _nullErrors = [];

const TripErrorsReducer = (state = _nullErrors, action) => {
    debugger
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_TRIP_ERRORS:
            return action.errors;
        case RECEIVE_A_TRIP:
            return _nullErrors;
        default:
            return state;
    }
};

export default TripErrorsReducer;