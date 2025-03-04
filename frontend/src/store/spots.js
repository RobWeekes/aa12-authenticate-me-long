// // Action Types
// const SET_SPOTS = 'SET_SPOTS';    // use "SET_SPOTS" to set the store data to the spots data that is fetched from backend server (GET spots)
// const ADD_SPOT = 'ADD_SPOT';
// const UPDATE_SPOT = 'UPDATE_SPOT';
// const DELETE_SPOT = 'DELETE_SPOT';
// const SET_LOADING = 'SET_LOADING';
// const SET_ERROR = 'SET_ERROR';
// const LOAD_SPOTS = 'spots/loadSpots';

// // Action Creators
// export const setSpots = (spots) => ({
//   type: SET_SPOTS,
//   payload: spots,
// });

// export const loadSpots = (spots) => ({
//   type: LOAD_SPOTS,
//   payload: spots
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

// // Thunk Action Creator
// // Something is triggering a request to /api/spots/undefined before the normal spot data flow occurs. Let's add logs to track all spot-related actions:
// // export const fetchAllSpots = () => async (dispatch) => {
// //   console.log('fetchAllSpots called');
// //   try  {
// //     const response = await fetch('/api/spots');
// //     console.log('fetchAllSpots response:', response);
// //     if (response.ok) {
// //       const spots = await response.json();
// //       console.log('fetchAllSpots data:', spots);
// //       dispatch(setSpots(spots));
// //       return spots;
// //     }
// //   } catch (error) {
// //     console.error('Error in fetchAllSpots:', error);
// //   }
// // };

// // Verify the spots data flow by:
// // Check the Redux state structure: window.store.getState()
// // Test your fetchAllSpots action: window.store.dispatch(fetchAllSpots())
// export const fetchAllSpots = () => async (dispatch) => {
//   dispatch(setLoading(true)); // Set loading to true before API call
//   try {
//     const response = await fetch('/api/spots');
//     if (response.ok) {
//       const spots = await response.json();
//       dispatch(setSpots(spots)); // Dispatch the SET_SPOTS action with the fetched spots
//     } else {
//       dispatch(setError('Failed to fetch spots'));
//     }
//   } catch (error) {
//     dispatch(setError('Error fetching spots'));
//   } finally {
//     dispatch(setLoading(false)); // Set loading to false after the API call finishes
//   }
// };

// export const fetchSpotById = (id) => async (dispatch) => {
//   // Adding logs to track where the undefined ID request is coming from:
//   console.log('fetchSpotById called with id:', id);
//   console.log('Call stack:', new Error().stack);
//   console.log('Current route:', window.location.pathname);

//   if (!id) return;  // validate the ID before making the request
//   try {
//     const response = await fetch(`/api/spots/${id}`);
//     const data = await response.json();
//     dispatch(setSpots([data]));
//     return data;
//   } catch (error) {
//     dispatch(setError(error.message));
//   }
// };

// // Initial State
// const initialState = {
//   spots: [],
//   loading: false,
//   error: null,
// };

// // Reducer
// const spotsReducer = (state = initialState, action) => {
//   // Check for special Redux actions and ignore them
//   if (action.type.startsWith('@@redux/')) {
//     return state;
//   }

//   switch (action.type) {
//     case SET_SPOTS:
//       // Updating the spots reducer to handle an error state correctly. This will ensure proper state management when API requests fail/ return errors.
//       // if (action.payload.message) {
//       //   return { ...state, error: action.payload.message }
//       // }
//       // return { ...state, spots: action.payload.Spots }
//   if (!action.payload || !Array.isArray(action.payload)) {
//     return { ...state, error: 'Invalid data received' };
//   }
//   return { ...state, spots: action.payload };

//     case LOAD_SPOTS:
//       return { ...state, spots: action.payload };
//     case ADD_SPOT:
//       return { ...state, spots: [...state.spots, action.payload] };
//     case UPDATE_SPOT:
//       return {
//         ...state,
//         spots: state.spots.map(spot =>
//           spot.id === action.payload.id ? action.payload : spot
//         ),
//       };
//     case DELETE_SPOT:
//       return {
//         ...state,
//         spots: state.spots.filter(spot => spot.id !== action.payload),
//       };
//     case SET_LOADING:
//       return { ...state, loading: action.payload };
//     case SET_ERROR:
//       return { ...state, error: action.payload };
//     default:
//       return state;
//   }
// };

// export default spotsReducer;
// Action Types
const SET_SPOTS = 'SET_SPOTS';
const ADD_SPOT = 'ADD_SPOT';
const UPDATE_SPOT = 'UPDATE_SPOT';
const DELETE_SPOT = 'DELETE_SPOT';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';

// Action Creators
export const setSpots = (spots) => ({
  type: SET_SPOTS,
  payload: spots,
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

// Thunk Action Creators

export const fetchAllSpots = () => async (dispatch) => {
  dispatch(setLoading(true)); // Set loading state to true before API call
  try {
    const response = await fetch('/api/spots');
    if (!response.ok) {
      throw new Error('Failed to fetch spots');
    }
    const spotsdata = await response.json();

    // Log the response to check the structure
    console.log("Fetched spots:", spotsdata);

    // Validate the response format (should be an array inside 'Spots' key)
    if (!Array.isArray(spotsdata.Spots)) {
      throw new Error('Invalid data received for spots');
    }

    dispatch(setSpots(spotsdata.Spots)); // Dispatch action to set spots in store
  } catch (error) {
    console.error(error);
    dispatch(setError(error.message)); // Dispatch an error if fetching fails
  } finally {
    dispatch(setLoading(false)); // Set loading to false after API call finishes
  }
};

// Fetch spot by ID and handle errors gracefully
export const fetchSpotById = (id) => async (dispatch) => {
  console.log('fetchSpotById called with id:', id);
  console.log('Call stack:', new Error().stack);

  if (!id) return;  // Validate the ID before making the request
  dispatch(setLoading(true));  // Optional: Set loading state for this specific fetch
  try {
    const response = await fetch(`/api/spots/${id}`);
    if (response.ok) {
      const spotdata = await response.json();
      dispatch(setSpots([spotdata])); // Dispatch single spot to store
    } else {
      dispatch(setError('Spot not found')); // Handle specific spot fetch error
    }
  } catch (error) {
    dispatch(setError('Error fetching spot by ID')); // Handle fetch error
  } finally {
    dispatch(setLoading(false)); // Set loading to false after the API call finishes
  }
};

// Initial State
const initialState = {
  spots: [],
  loading: false,
  error: null,
};

// Reducer with improved error handling
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      // Ensure we only update spots if we receive a valid array
      if (!Array.isArray(action.payload)) {
        return { ...state, error: 'Invalid data received for spots' };
      }
      return { ...state, spots: action.payload, error: null };

    case ADD_SPOT:
      return { ...state, spots: [...state.spots, action.payload] };

    case UPDATE_SPOT:
      return {
        ...state,
        spots: state.spots.map(spot =>
          spot.id === action.payload.id ? action.payload : spot
        ),
      };

    case DELETE_SPOT:
      return {
        ...state,
        spots: state.spots.filter(spot => spot.id !== action.payload),
      };

    case SET_LOADING:
      return { ...state, loading: action.payload };

    case SET_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default spotsReducer;
