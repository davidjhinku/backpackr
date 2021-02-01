import { combineReducers } from 'redux';
import session from './session_api_reducer';
import errors from "./errors_reducer";
import trips from './trips_reducer'

const RootReducer = combineReducers({
  session,
  errors,
  trips
});

export default RootReducer;