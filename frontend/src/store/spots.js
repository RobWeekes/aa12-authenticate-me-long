// Action Types
const SET_SPOTS = 'SET_SPOTS';    // use "SET_SPOTS" to set the store data to the spots data that is fetched from backend server (GET spots)
const ADD_SPOT = 'ADD_SPOT';
const UPDATE_SPOT = 'UPDATE_SPOT';
const DELETE_SPOT = 'DELETE_SPOT';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';
const LOAD_SPOTS = 'spots/loadSpots';

// Action Creators
export const setSpots = (spots) => ({
  type: SET_SPOTS,
  payload: spots,
});

export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  payload: spots
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

// Thunk Action Creator
export const fetchAllSpots = () => async (dispatch) => {
  try  {
    const response = await fetch('/api/spots');
    console.log('response:', response)
    if (response.ok) {
      const spots = await response.json();
      console.log('spots:', spots)
      dispatch(setSpots(spots));
      return spots;
    }
  } catch (error) {
    console.error('Error fetching spots:', error);
  }
};

// Verify the spots data flow by:
// Check the Redux state structure: window.store.getState()
// Test your fetchAllSpots action: window.store.dispatch(fetchAllSpots())

export const fetchSpotById = (id) => async (dispatch) => {
  if (!id) return;  // validate the ID before making the request
  try {
    const response = await fetch(`/api/spots/${id}`);
    const data = await response.json();
    dispatch(setSpots([data]));
    return data;
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Initial State
const initialState = {
  spots: [],
  loading: false,
  error: null,
};

// Reducer
const spotsReducer = (state = initialState, action) => {
  // Check for special Redux actions and ignore them
  if (action.type.startsWith('@@redux/')) {
    return state;
  }

  switch (action.type) {
    case SET_SPOTS:
      // Updating the spots reducer to handle an error state correctly. This will ensure proper state management when API requests fail/ return errors.
      if (action.payload.message) {
        return { ...state, error: action.payload.message }
      }
      return { ...state, spots: action.payload.Spots }
    case LOAD_SPOTS:
      return { ...state, spots: action.payload };
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
