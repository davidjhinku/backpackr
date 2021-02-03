import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';
import TripErrorsReducer from './trip_errors_reducer';
import CommentErrorReducer from './comment_errors_reducer';

export default combineReducers({
  session: SessionErrorsReducer,
  trip: TripErrorsReducer,
  comment: CommentErrorReducer
});