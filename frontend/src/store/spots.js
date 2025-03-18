// frontend/src/store/spots.js
// // frontend/src/store/spots.js

// import { csrfFetch } from './csrf';

// // Action Types
// const SET_SPOTS = 'spots/SET_SPOTS';
// const SET_SINGLE_SPOT = 'spots/SET_SINGLE_SPOT';
// const ADD_SPOT = 'spots/ADD_SPOT';
// const UPDATE_SPOT = 'spots/UPDATE_SPOT';
// const DELETE_SPOT = 'spots/DELETE_SPOT';
// const SET_LOADING = 'spots/SET_LOADING';
// const SET_ERROR = 'spots/SET_ERROR';
// const SET_USER_SPOTS = 'spots/SET_USER_SPOTS';
// const REMOVE_SPOT = 'spots/REMOVE_SPOT';

// // Action Creators
// export const setSpots = (spots) => ({
//   type: SET_SPOTS,
//   payload: spots,
// });

// export const setSingleSpot = (spot) => ({
//   type: SET_SINGLE_SPOT,
//   payload: spot,
// });

// export const addSpot = (spot) => ({
//   type: ADD_SPOT,
//   payload: spot,
// });

// export const updateSpot = (spot) => ({
//   type: UPDATE_SPOT,
//   payload: spot,
// });

// export const deleteSpot = (id) => ({
//   type: DELETE_SPOT,
//   payload: id,
// });

// export const setLoading = (loading) => ({
//   type: SET_LOADING,
//   payload: loading,
// });

// export const setError = (error) => ({
//   type: SET_ERROR,
//   payload: error,
// });

// export const setUserSpots = (spots) => ({
//   type: SET_USER_SPOTS,
//   payload: spots,
// });

// export const removeSpot = (spotId) => ({
//   type: REMOVE_SPOT,
//   payload: spotId,
// });

// export const resetSpotsState = () => {
//   return {
//     type: 'spots/RESET_STATE'
//   };
// };

// // Thunk Action Creators
// export const fetchAllSpots = () => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     const response = await fetch('/api/spots');
//     if (!response.ok) {
//       throw new Error('Failed to fetch spots');
//     }
//     const data = await response.json();
//     // Log the response to check the structure
//     console.log("Fetched spots:", data);
//     // Validate the response format (should be an array inside 'Spots' key)
//     if (!data.Spots || !Array.isArray(data.Spots)) {
//       throw new Error('Invalid data received for spots');
//     }
//     dispatch(setSpots(data.Spots));
//     return data.Spots;
//   } catch (error) {
//     console.error(error);
//     dispatch(setError(error.message));
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// export const fetchSpotById = (id) => async (dispatch) => {
//   if (!id) {
//     dispatch(setError('Invalid spot ID'));
//     return;
//   }
//   dispatch(setLoading(true));
//   try {
//     const response = await fetch(`/api/spots/${id}`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch spot');
//     }
//     const spot = await response.json();
//     console.log('Fetched spot by ID:', spot);
//     dispatch(setSingleSpot(spot));
//     return spot;
//   } catch (error) {
//     console.error(error);
//     dispatch(setError(error.message));
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// // New thunk action creator for creating a spot
// export const createSpot = (spotData, images) => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     // First create the spot
//     const response = await csrfFetch('/api/spots', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(spotData)
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Failed to create spot');
//     }

//     const newSpot = await response.json();
//     // Then add images to the spot
//     if (images && images.length > 0) {
//       for (const image of images) {
//         await csrfFetch(`/api/spots/${newSpot.id}/images`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(image)
//         });
//       }
//     }
//     // Fetch the complete spot with images
//     const completeSpotResponse = await fetch(`/api/spots/${newSpot.id}`);
//     if (!completeSpotResponse.ok) {
//       throw new Error('Failed to fetch complete spot details');
//     }
//     const completeSpot = await completeSpotResponse.json();
//     // Dispatch action to add the spot to the store
//     dispatch(addSpot(completeSpot));
//     dispatch(setSingleSpot(completeSpot));
//     return completeSpot;
//   } catch (error) {
//     console.error('Error creating spot:', error);
//     dispatch(setError(error.message));
//     throw error; // Re-throw to handle in the component
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// // Enhanced thunk action creator for fetching user spots
// export const fetchUserSpots = () => async (dispatch) => {
//   dispatch(setLoading(true));
//   dispatch(setError(null)); // Clear any previous errors

//   try {
//     console.log('Fetching user spots...');

//     // Log the CSRF token to make sure it exists
//     console.log('CSRF Token:', localStorage.getItem('XSRF-TOKEN'));

//     // Make a direct fetch first to debug
//     const directResponse = await fetch('/api/spots/current', {
//       headers: {
//         'Content-Type': 'application/json',
//         'XSRF-Token': localStorage.getItem('XSRF-TOKEN')
//       },
//       credentials: 'include'
//     });

//     console.log('Direct fetch response status:', directResponse.status);

//     if (directResponse.ok) {
//       const directData = await directResponse.json();
//       console.log('Direct fetch response data:', directData);
//     }

//     // Now use csrfFetch for the actual request
//     const response = await csrfFetch('/api/spots/current', {
//       credentials: 'include' // Ensure cookies are sent with the request
//     });

//     console.log('csrfFetch response status:', response.status);

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || `Failed to fetch your spots: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Fetched user spots response:", data);

//     // Check if data has the expected structure
//     if (!data || !data.Spots) {
//       console.error('Invalid data structure received:', data);
//       throw new Error('Invalid data received for user spots');
//     }

//     // Make sure we're setting an array
//     const spotsArray = Array.isArray(data.Spots) ? data.Spots : [];
//     console.log("Setting user spots in Redux:", spotsArray);

//     // Dispatch the action with the spots array
//     dispatch(setUserSpots(spotsArray));

//     // Return the spots array
//     return spotsArray;
//   } catch (error) {
//     console.error('Error fetching user spots:', error);
//     dispatch(setError(error.message));
//     // Return an empty array instead of throwing
//     return [];
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// // Enhanced thunk action creator for deleting a spot
// export const deleteSpotThunk = (spotId) => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     console.log(`Deleting spot with ID: ${spotId}`);

//     const response = await csrfFetch(`/api/spots/${spotId}`, {
//       method: 'DELETE'
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Failed to delete spot');
//     }

//     console.log(`Successfully deleted spot with ID: ${spotId}`);
//     dispatch(deleteSpot(spotId));

//     // After deleting, refresh the user spots
//     await dispatch(fetchUserSpots());

//     return true;
//   } catch (error) {
//     console.error('Error deleting spot:', error);
//     dispatch(setError(error.message));
//     throw error;
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// // Initial State
// const initialState = {
//   allSpots: {},
//   singleSpot: null,
//   userSpots: [],
//   loading: false,
//   error: null,
// };

// // Reducer
// const spotsReducer = (state = initialState, action) => {
//   console.log('Reducer received action:', action.type, action.payload);

//   switch (action.type) {
//     case SET_SPOTS: {
//       const allSpots = {};
//       action.payload.forEach(spot => {
//         allSpots[spot.id] = spot;
//       });
//       return {
//         ...state,
//         allSpots,
//         error: null
//       };
//     }
//     case SET_SINGLE_SPOT:
//       return {
//         ...state,
//         singleSpot: action.payload,
//         error: null
//       };
//     case ADD_SPOT:
//       return {
//         ...state,
//         allSpots: {
//           ...state.allSpots,
//           [action.payload.id]: action.payload
//         },
//         // Also add to userSpots since the current user created it
//         userSpots: [...state.userSpots, action.payload]
//       };
//     case UPDATE_SPOT:
//       return {
//         ...state,
//         allSpots: {
//           ...state.allSpots,
//           [action.payload.id]: action.payload
//         },
//         singleSpot: state.singleSpot?.id === action.payload.id ?
//           action.payload : state.singleSpot,
//         userSpots: state.userSpots.map(spot =>
//           spot.id === action.payload.id ? action.payload : spot
//         )
//       };
//     case DELETE_SPOT: {
//       console.log(`Reducer: Deleting spot with ID: ${action.payload}`);
//       console.log('Current userSpots:', state.userSpots);

//       const newAllSpots = { ...state.allSpots };
//       delete newAllSpots[action.payload];

//       const filteredUserSpots = state.userSpots.filter(spot => {
//         const result = spot.id !== action.payload;
//         console.log(`Spot ID: ${spot.id}, action.payload: ${action.payload}, keep: ${result}`);
//         return result;
//       });

//       console.log('Filtered userSpots:', filteredUserSpots);

//       return {
//         ...state,
//         allSpots: newAllSpots,
//         singleSpot: state.singleSpot?.id === action.payload ?
//           null : state.singleSpot,
//         userSpots: filteredUserSpots
//       };
//     }
//     case SET_USER_SPOTS: {
//       console.log('SET_USER_SPOTS action received with payload:', action.payload);

//       // Make sure we're setting an array
//       const userSpotsArray = Array.isArray(action.payload) ? action.payload : [];

//       // Log the new state we're about to return
//       const newState = {
//         ...state,
//         userSpots: userSpotsArray,
//         error: null
//       };
//       console.log('New state after SET_USER_SPOTS:', newState);

//       return newState;
//     }
//     case REMOVE_SPOT: {
//       return {
//         ...state,
//         allSpots: Object.keys(state.allSpots).reduce((newSpots, key) => {
//           if (Number(key) !== action.payload) {
//             newSpots[key] = state.allSpots[key];
//           }
//           return newSpots;
//         }, {}),
//         userSpots: state.userSpots.filter(spot => spot.id !== action.payload),
//         singleSpot: state.singleSpot?.id === action.payload ? null : state.singleSpot
//       };
//     }
//     case 'spots/RESET_STATE':
//   return initialState; // Return to initial state when user logs out
//     case SET_LOADING:
//       return { ...state, loading: action.payload };
//     case SET_ERROR:
//       return { ...state, error: action.payload };
//     default:
//       return state;
//   }
// };

// export default spotsReducer;






// frontend/src/store/spots.js
import { csrfFetch } from './csrf';
import Cookies from 'js-cookie';

// Action Types
const SET_SPOTS = 'spots/SET_SPOTS';
const SET_SINGLE_SPOT = 'spots/SET_SINGLE_SPOT';
const ADD_SPOT = 'spots/ADD_SPOT';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const SET_LOADING = 'spots/SET_LOADING';
const SET_ERROR = 'spots/SET_ERROR';
const SET_USER_SPOTS = 'spots/SET_USER_SPOTS';
const REMOVE_SPOT = 'spots/REMOVE_SPOT';
const RESET_STATE = 'spots/RESET_STATE';

// Action Creators
export const setSpots = (spots) => ({
  type: SET_SPOTS,
  payload: spots,
});

export const setSingleSpot = (spot) => ({
  type: SET_SINGLE_SPOT,
  payload: spot,
});

export const addSpot = (spot) => ({
  type: ADD_SPOT,
  payload: spot,
});

export const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  payload: spot,
});

export const deleteSpot = (id) => ({
  type: DELETE_SPOT,
  payload: id,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const setUserSpots = (spots) => ({
  type: SET_USER_SPOTS,
  payload: spots,
});

export const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  payload: spotId,
});

export const resetSpotsState = () => ({
  type: RESET_STATE
});

// Helper function to ensure CSRF token is available
const ensureCsrfToken = async () => {
  const token = Cookies.get('XSRF-TOKEN');
  if (!token) {
    console.log('No CSRF token found, fetching a new one...');
    try {
      const response = await fetch('/api/csrf/restore', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        console.log('New CSRF token received:', data['XSRF-Token']);
      } else {
        console.error('Failed to fetch CSRF token');
      }
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  }
};

// Thunk Action Creators
export const fetchAllSpots = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await csrfFetch('/api/spots');
    if (!response.ok) {
      throw new Error('Failed to fetch spots');
    }
    const data = await response.json();
    // Validate the response format
    if (!data.Spots || !Array.isArray(data.Spots)) {
      throw new Error('Invalid data received for spots');
    }
    dispatch(setSpots(data.Spots));
    return data.Spots;
  } catch (error) {
    console.error('Error fetching all spots:', error);
    dispatch(setError(error.message));
    return [];
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchSpotById = (id) => async (dispatch) => {
  if (!id) {
    dispatch(setError('Invalid spot ID'));
    return;
  }
  dispatch(setLoading(true));
  try {
    const response = await csrfFetch(`/api/spots/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch spot');
    }
    const spot = await response.json();
    dispatch(setSingleSpot(spot));
    return spot;
  } catch (error) {
    console.error('Error fetching spot by ID:', error);
    dispatch(setError(error.message));
    return null;
  } finally {
    dispatch(setLoading(false));
  }
};

export const createSpot = (spotData, images) => async (dispatch) => {
  dispatch(setLoading(true));
  // Ensure CSRF token is available before making the request
  await ensureCsrfToken();
  try {
    console.log('Creating spot with data:', spotData);
    // First create the spot
    const response = await csrfFetch('/api/spots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'XSRF-Token': Cookies.get('XSRF-TOKEN')
      },
      body: JSON.stringify(spotData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error creating spot:', errorData);
      throw new Error(errorData.message || 'Failed to create spot');
    }

    const newSpot = await response.json();
    console.log('Spot created successfully:', newSpot);
    // Then add images to the spot
    if (images && images.length > 0) {
      console.log('Adding images to spot:', images);
      for (const image of images) {
        const imageResponse = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'XSRF-Token': Cookies.get('XSRF-TOKEN')
          },
          body: JSON.stringify(image)
        });
        if (!imageResponse.ok) {
          console.warn('Failed to add image to spot:', await imageResponse.json());
        } else {
          console.log('Image added successfully');
        }
      }
    }
    // Fetch the complete spot with images
    console.log('Fetching complete spot details');
    const completeSpotResponse = await csrfFetch(`/api/spots/${newSpot.id}`);
    if (!completeSpotResponse.ok) {
      console.warn('Failed to fetch complete spot details');
      // Still dispatch with the data that exists
      dispatch(addSpot(newSpot));
      dispatch(setSingleSpot(newSpot));
      return newSpot;
    }
    const completeSpot = await completeSpotResponse.json();
    console.log('Complete spot details:', completeSpot);
    dispatch(addSpot(completeSpot));
    dispatch(setSingleSpot(completeSpot));
    // Refresh user spots
    dispatch(fetchUserSpots());
    return completeSpot;
  } catch (error) {
    console.error('Error creating spot:', error);
    dispatch(setError(error.message || 'Failed to create spot'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchUserSpots = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  // Ensure CSRF token is available
  await ensureCsrfToken();
  try {
    console.log('Fetching user spots...');
    const response = await csrfFetch('/api/spots/current', {
      credentials: 'include',
      headers: {
        'XSRF-Token': Cookies.get('XSRF-TOKEN')
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error fetching user spots:', errorData);
      throw new Error(errorData.message || `Failed to fetch your spots: ${response.status}`);
    }

    const data = await response.json();
    console.log('User spots data from API:', data);
    // Check if data has the expected structure
    if (!data || !data.Spots) {
      throw new Error('Invalid data received for user spots');
    }

    // Make sure an array is being set
    const spotsArray = Array.isArray(data.Spots) ? data.Spots : [];
    console.log('Processed user spots array:', spotsArray);
    // Dispatch the action with the spots array
    dispatch(setUserSpots(spotsArray));
    return spotsArray;
  } catch (error) {
    console.error('Error fetching user spots:', error);
    dispatch(setError(error.message || 'Failed to fetch your spots'));
    return [];
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
  dispatch(setLoading(true));
  // Ensure CSRF token is available
  await ensureCsrfToken();
  try {
    console.log('Deleting spot with ID:', spotId);
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE',
      headers: {
        'XSRF-Token': Cookies.get('XSRF-TOKEN')
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error deleting spot:', errorData);
      throw new Error(errorData.message || 'Failed to delete spot');
    }

    console.log('Spot deleted successfully');
    dispatch(deleteSpot(spotId));
    // After deleting, refresh the user spots
    await dispatch(fetchUserSpots());
    return true;
  } catch (error) {
    console.error('Error deleting spot:', error);
    dispatch(setError(error.message || 'Failed to delete spot'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

// Updated updateSpotThunk with improved error handling and state updates
export const updateSpotThunk = (spotId, spotData) => async (dispatch) => {
  console.log('updateSpotThunk called with ID:', spotId, 'and data:', spotData);
  dispatch(setLoading(true));
  dispatch(setError(null)); // Clear any previous errors
  
  // Ensure CSRF token is available
  await ensureCsrfToken();
  
  try {
    console.log('Updating spot with ID:', spotId, 'Data:', spotData);
    
    // Make sure spotId is valid
    if (!spotId) {
      throw new Error('Invalid spot ID');
    }
    
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'XSRF-Token': Cookies.get('XSRF-TOKEN')
      },
      body: JSON.stringify(spotData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error updating spot:', errorData);
      throw new Error(errorData.message || `Failed to update spot: ${response.status}`);
    }

    const updatedSpot = await response.json();
    console.log('Spot updated successfully:', updatedSpot);
    
    // Update the spot in Redux store
    dispatch(updateSpot(updatedSpot));
    
    // Also update the single spot if it's currently loaded
    dispatch(setSingleSpot(updatedSpot));
    
    // Refresh user spots to ensure consistency
    dispatch(fetchUserSpots());
    
    return updatedSpot;
  } catch (error) {
    console.error('Error updating spot:', error);
    dispatch(setError(error.message || 'Failed to update spot'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

// Initial State
const initialState = {
  allSpots: {},
  singleSpot: null,
  userSpots: [],
  loading: false,
  error: null,
};

// Reducer
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS: {
      const allSpots = {};
      action.payload.forEach(spot => {
        allSpots[spot.id] = spot;
      });
      return {
        ...state,
        allSpots,
        error: null
      };
    }
    case SET_SINGLE_SPOT:
      return {
        ...state,
        singleSpot: action.payload,
        error: null
      };
    case ADD_SPOT:
      return {
        ...state,
        allSpots: {
          ...state.allSpots,
          [action.payload.id]: action.payload
        },
        // Don't add to userSpots here - let fetchUserSpots handle that
        error: null
      };
    case UPDATE_SPOT:
      return {
        ...state,
        // Update in allSpots
        allSpots: {
          ...state.allSpots,
          [action.payload.id]: action.payload
        },
        // Update in singleSpot if it matches
        singleSpot: state.singleSpot?.id === action.payload.id ?
          action.payload : state.singleSpot,
        // Update in userSpots if it exists there
        userSpots: state.userSpots.map(spot =>
          spot.id === action.payload.id ? action.payload : spot
        ),
        error: null
      };
    case DELETE_SPOT: {
      const newAllSpots = { ...state.allSpots };
      delete newAllSpots[action.payload];
      const filteredUserSpots = state.userSpots.filter(spot =>
        spot.id !== action.payload
      );
      return {
        ...state,
        allSpots: newAllSpots,
        singleSpot: state.singleSpot?.id === action.payload ?
          null : state.singleSpot,
        userSpots: filteredUserSpots,
        error: null
      };
    }
    case SET_USER_SPOTS: {
      // Make sure an array is being set and not overwriting with a single spot
      const userSpotsArray = Array.isArray(action.payload) ? action.payload : [];
      return {
        ...state,
        userSpots: userSpotsArray, // Replace the entire array, don't append
        error: null
      };
    }
    case REMOVE_SPOT: {
      return {
        ...state,
        allSpots: Object.keys(state.allSpots).reduce((newSpots, key) => {
          if (Number(key) !== action.payload) {
            newSpots[key] = state.allSpots[key];
          }
          return newSpots;
        }, {}),
        userSpots: state.userSpots.filter(spot => spot.id !== action.payload),
        singleSpot: state.singleSpot?.id === action.payload ? null : state.singleSpot,
        error: null
      };
    }
    case RESET_STATE:
      return initialState;
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default spotsReducer;

