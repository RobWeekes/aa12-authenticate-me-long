// frontend/src/store/store.js
// import { createStore, combineReducers, applyMiddleware, compose } from redux;
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import thunk from redux-thunk;
// import thunk from 'redux-thunk';
import { thunk } from 'redux-thunk';
// import { default as thunk } from 'redux-thunk';
// added below for phase 1 of frontend readme

import sessionReducer from './session';
import spotsReducer from './spots';
import reviewsReducer from './reviews';

const rootReducer = combineReducers({
  // added below for phase 1 of frontend readme
  session: sessionReducer,
  spots: spotsReducer,
  reviews: reviewsReducer,
});

let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

// export default store;
// The configureStore function will be used by main.jsx to attach the Redux store to the React application.
export default configureStore;