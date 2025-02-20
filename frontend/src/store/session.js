// frontend/src/store/session.js
// This file will contain all the actions specific to the session user's information and the session user's Redux reducer.

import { csrfFetch } from './csrf';

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

// Call your backend API to log in, and then set the session user from the response. Create a thunk action for making a request to POST /api/session
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  try {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({
        credential,
        password
      })
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    // dispatch the action for setting the session user to the user in the response's body
    dispatch(setUser(data.user));
    return response;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

// Ex. to test login thunk action in browser console:
/*
store.dispatch(
  sessionActions.login({
    credential: "Demo-lition",
    password: "password"
  })
)
*/

const initialState = { user: null };

// SESSION REDUCER
const sessionReducer = (state = initialState, action) => {
    // Log the action for debugging
  console.log("Received action in sessionReducer:", action);

  // Check if the action is undefined or a special Redux action
  if (!action || !action.type || action.type.startsWith('@@redux/')) {
    console.error('Received undefined or invalid action in session reducer:', action);
    return state;  // Return current state if action is invalid
  }

  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

// Restore user session from backend
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// Signup functionality
export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// Logout functionality
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return response;
};

// Ex. to test logout thunk action in browser console:
/*
store.dispatch(
  sessionActions.logout()
)
*/


export default sessionReducer;
