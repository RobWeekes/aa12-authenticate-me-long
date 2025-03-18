// // frontend/src/store/session.js
// frontend/src/store/session.js
// import { csrfFetch } from './csrf';
// import { resetSpotsState } from './spots';

// // Action Types
// const SET_USER = "session/setUser";
// const REMOVE_USER = "session/removeUser";

// // Action Creators
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

// // Login thunk action
// export const login = (user) => async (dispatch) => {
//   const { credential, password } = user;
//   try {
//     // Perform the login request
//     const response = await csrfFetch("/session", {
//       method: "POST",
//       body: JSON.stringify({
//         credential,
//         password
//       })
//     });

//     if (response.ok) {
//       const data = await response.json();
//       dispatch(setUser(data.user)); // Set the user on successful login
//       return data;
//     } else {
//       const errorData = await response.json();
//       throw new Error(errorData.errors?.credential || 'An error occurred during login');
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     let errorMessage = 'An error occurred during login';
//     if (error.message) {
//       errorMessage = error.message;
//     }
//     return Promise.reject({ errors: { credential: errorMessage } });
//   }
// };

// // Restore user thunk action (on app load to restore session)
// export const restoreUser = () => async (dispatch) => {
//   try {
//     const response = await csrfFetch('/session'); // Check if user is logged in
//     if (response.ok) {
//       const data = await response.json();
//       dispatch(setUser(data.user)); // Restore user session
//       return data;
//     }
//   } catch (error) {
//     console.error('Error restoring user session:', error);
//     return null;
//   }
// };

// // Signup thunk action
// export const signup = (user) => async (dispatch) => {
//   const { username, firstName, lastName, email, password } = user;
//   try {
//     const response = await csrfFetch("/users", {
//       method: "POST",
//       body: JSON.stringify({
//         username,
//         firstName,
//         lastName,
//         email,
//         password
//       })
//     });

//     if (response.ok) {
//       const data = await response.json();
//       dispatch(setUser(data.user)); // Set user after signup
//       return data;
//     } else {
//       const errorData = await response.json();
//       throw new Error(errorData.errors?.email || 'An error occurred during signup');
//     }
//   } catch (error) {
//     console.error('Signup error:', error);
//     let errorMessage = 'An error occurred during signup';
//     if (error.message) {
//       errorMessage = error.message;
//     }
//     return Promise.reject({ errors: { email: errorMessage } });
//   }
// };

// // Logout thunk action
// export const logout = () => async (dispatch) => {
//   try {
//     const response = await csrfFetch('/session', {
//       method: 'DELETE' // Perform the logout request
//     });

//     if (response.ok) {
//       dispatch(resetSpotsState()); // Reset spots state on logout
//       dispatch(removeUser()); // Remove user from the store
//       return response;
//     }
//   } catch (error) {
//     console.error('Logout error:', error);
//     return null;
//   }
// };

// // Initial state
// const initialState = { user: null };

// // SESSION REDUCER
// const sessionReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_USER:
//       return { ...state, user: action.payload }; // Set the logged-in user
//     case REMOVE_USER:
//       return { ...state, user: null }; // Clear the user on logout
//     default:
//       return state;
//   }
// };

// export default sessionReducer;





// frontend/src/store/session.js
import { csrfFetch } from './csrf';
import { resetSpotsState } from './spots';

// Action Types
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

// Action Creators
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

// Login thunk action
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  try {
    // Perform the login request
    const response = await csrfFetch("/api/session", {  // Fixed: added /api prefix
      method: "POST",
      body: JSON.stringify({
        credential,
        password
      })
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data.user)); // Set the user on successful login
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.errors?.credential || 'An error occurred during login');
    }
  } catch (error) {
    console.error('Login error:', error);
    let errorMessage = 'An error occurred during login';
    if (error.message) {
      errorMessage = error.message;
    }
    return Promise.reject({ errors: { credential: errorMessage } });
  }
};

// Restore user thunk action (on app load to restore session)
export const restoreUser = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/session'); // Fixed: added /api prefix
    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data.user)); // Restore user session
      return data;
    }
  } catch (error) {
    console.error('Error restoring user session:', error);
    return null;
  }
};

// Signup thunk action
export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  try {
    const response = await csrfFetch("/api/users", {  // Fixed: added /api prefix
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password
      })
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data.user)); // Set user after signup
      console.log('User set in Redux store after signup:', data.user);
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.errors?.email || 'An error occurred during signup');
    }
  } catch (error) {
    console.error('Signup error:', error);
    let errorMessage = 'An error occurred during signup';
    if (error.message) {
      errorMessage = error.message;
    }
    return Promise.reject({ errors: { email: errorMessage } });
  }
};

// Logout thunk action
export const logout = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/session', {  // Fixed: added /api prefix
      method: 'DELETE' // Perform the logout request
    });

    if (response.ok) {
      dispatch(resetSpotsState()); // Reset spots state on logout
      dispatch(removeUser()); // Remove user from the store
      return response;
    }
  } catch (error) {
    console.error('Logout error:', error);
    return null;
  }
};

// Initial state
const initialState = { user: null };

// SESSION REDUCER
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      console.log('Setting user in reducer:', action.payload);
      return { ...state, user: action.payload }; // Set the logged-in user
    case REMOVE_USER:
      return { ...state, user: null }; // Clear the user on logout
    default:
      return state;
  }
};

export default sessionReducer;
