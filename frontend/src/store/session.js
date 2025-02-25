// // frontend/src/store/session.js
// // This file will contain all the actions specific to the session user's information and the session user's Redux reducer.

// import { csrfFetch } from './csrf';

// const SET_USER = "session/setUser";
// const REMOVE_USER = "session/removeUser";

// export const setUser = (user) => {
//   return {
//     type: SET_USER,
//     payload: user
//   };
// };

// export const removeUser = () => {
//   return {
//     type: REMOVE_USER
//   };
// };

// // Call your backend API to log in, and then set the session user from the response. Create a thunk action for making a request to POST /api/session
// export const login = (user) => async (dispatch) => {
//   const { credential, password } = user;
//   try {
//     const response = await csrfFetch("/api/session", {
//       method: "POST",
//       body: JSON.stringify({
//         credential,
//         password
//       })
//     });

//     if (!response.ok) {
//       throw new Error("Login failed");
//     }

//     const data = await response.json();
//     // dispatch the action for setting the session user to the user in the response's body
//     dispatch(setUser(data.user));
//     return response;
//   } catch (error) {
//     console.error(error);
//     return { error: error.message };
//   }
// };

// // Ex. to test login thunk action in browser console:
// /*
// store.dispatch(
//   sessionActions.login({
//     credential: "Demo-lition",
//     password: "password"
//   })
// )
// */

// const initialState = { user: null };

// // SESSION REDUCER
// const sessionReducer = (state = initialState, action) => {
//     // Log the action for debugging
//   console.log("Received action in sessionReducer:", action);

//   // Check if the action is undefined or a special Redux action
//   if (!action || !action.type || action.type.startsWith('@@redux/')) {
//     console.error('Received undefined or invalid action in session reducer:', action);
//     return state;  // Return current state if action is invalid
//   }

//   switch (action.type) {
//     case SET_USER:
//       return { ...state, user: action.payload };
//     case REMOVE_USER:
//       return { ...state, user: null };
//     default:
//       return state;
//   }
// };

// // Restore user session from backend
// export const restoreUser = () => async (dispatch) => {
//   const response = await csrfFetch("/api/session");
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };

// // Signup functionality
// export const signup = (user) => async (dispatch) => {
//   const { username, firstName, lastName, email, password } = user;
//   const response = await csrfFetch("/api/users", {
//     method: "POST",
//     body: JSON.stringify({
//       username,
//       firstName,
//       lastName,
//       email,
//       password
//     })
//   });
//   const data = await response.json();
//   dispatch(setUser(data.user));
//   return response;
// };
// // Ex. to test signup thunk action in broswer console
//                                 /*
// store.dispatch(
//   sessionActions.signup({
//     username: "TesterLogin83",
//     firstName: "Testfirst",
//     lastName: "Testlast",
//     email: "testemail@aol.com",
//     password: "password2"
//   })
// )
//                                 */

// // Logout functionality
// export const logout = () => async (dispatch) => {
//   const response = await csrfFetch('/api/session', {
//     method: 'DELETE'
//   });
//   dispatch(removeUser());
//   return response;
// };

// // Ex. to test logout thunk action in browser console:
// /*
// store.dispatch(
//   sessionActions.logout()
// )
// */


// export default sessionReducer;
import { csrfFetch } from './csrf';

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const removeUser = () => ({
  type: REMOVE_USER
});

// Thunk Action Creators

// Login Functionality
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  try {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password })
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return { error: error.message }; // Return error for frontend usage
  }
};

// Restore User Session from Backend
export const restoreUser = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/session");
    if (!response.ok) throw new Error('Failed to restore user session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  } catch (error) {
    console.error('Restore user session error:', error);
    return { error: error.message };  // Return error for frontend usage
  }
};

// Signup Functionality
export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  try {
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

    if (!response.ok) throw new Error('Signup failed');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return { error: error.message };  // Return error for frontend usage
  }
};

// Logout Functionality
export const logout = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Logout failed');
    dispatch(removeUser());
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return { error: error.message };  // Return error for frontend usage
  }
};

// Initial State
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

export default sessionReducer;
