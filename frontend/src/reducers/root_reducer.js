import { combineReducers } from 'redux';
import session from './session_api_reducer';
import errors from "./errors_reducer";
import trips from './trip_reducer';
import items from './item_reducer';
import flightItems from './flight_item_reducer';
import comments from './comment_reducer';
import users from './users_reducer'

const RootReducer = combineReducers({
  session,
  errors,
  trips,
  items, 
  comments,
  users,
  flightItems
});

export default RootReducer;