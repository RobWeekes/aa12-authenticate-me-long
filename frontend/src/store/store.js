// frontend/src/store/store.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import sessionReducer from './session';
import spotsReducer from './spots';
import reviewsReducer from './reviews';

const rootReducer = combineReducers({
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

if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk, loggerMiddleware);
} else {
  const configureEnhancers = async () => {
    const logger = (await import("redux-logger")).default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return composeEnhancers(applyMiddleware(thunk, logger, loggerMiddleware));
  };
  
  // For now, initialize with thunk and loggerMiddleware
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, loggerMiddleware));
  
  // Then update it when logger is loaded
  configureEnhancers().then(newEnhancer => {
    enhancer = newEnhancer;
  });
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

