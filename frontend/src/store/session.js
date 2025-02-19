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
    dispatch(setUser(data.user));
    return response;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

// Ex. for a login thunk action test in the browser console, run:
// store.dispatch(sessionActions.login({
//   credential: "Demo-lition",
//   password: "password"
// }))

const initialState = { user: null };

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

// Restore user session from backend - prevents the need to log in again after refreshing browser
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
// When the page loads, restoreUser runs automatically in App.jsx Layout component.
// isLoaded state starts at false and sets to true after restoreUser returns.
// When 'isLoaded' is true, <Outlet /> is rendered & all 'children' components render.
// Ex. of how to test the restoreUser thunk action in the DevTools console:
// store.dispatch(sessionActions.restoreUser());

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

export default sessionReducer;
