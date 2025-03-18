// frontend/src/store/index.js
import { combineReducers } from 'redux';
import spotsReducer from './spots';
import reviewsReducer from './reviews';
import sessionReducer from './session';

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  reviews: reviewsReducer
});

export default rootReducer;