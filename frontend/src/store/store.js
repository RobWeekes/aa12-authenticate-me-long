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

// Add custom logging middleware:
const loggerMiddleware = store => next => action => {
  console.log('Dispatching:', action);
  console.log('Action Type:', action.type);
  console.log('Action Payload:', action.payload);
  console.log('Current State:', store.getState());
  const result = next(action);
  console.log('New State:', store.getState());
  return result;
};

let enhancer;
// if (import.meta.env.MODE === 'production') {
  if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk, loggerMiddleware);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger, loggerMiddleware));
}   // "loggerMiddleware" will log every action that flows through Redux, helping us track the undefined ID issue.

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

// We can test the data flow between the reducer & component - run in browser:
// window.store.getState()

// export default store;
// The configureStore function will be used by main.jsx to attach the Redux store to the React application.
export default configureStore;
