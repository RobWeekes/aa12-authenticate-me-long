// src/redux/store/spots.js

// Action Types
const FETCH_SPOTS = 'FETCH_SPOTS';
const FETCH_SPOT_DETAILS = 'FETCH_SPOT_DETAILS';
const CREATE_SPOT = 'CREATE_SPOT';
const UPDATE_SPOT = 'UPDATE_SPOT';
const DELETE_SPOT = 'DELETE_SPOT';

// Action Creators

// Fetch all spots
export const fetchSpots = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/spots');
      const data = await response.json();
      dispatch({ type: FETCH_SPOTS, payload: data });
    } catch (error) {
      console.error('Error fetching spots:', error);
    }
  };
};

// Fetch details of a single spot
export const fetchSpotDetails = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/spots/${id}`);
      const data = await response.json();
      dispatch({ type: FETCH_SPOT_DETAILS, payload: data });
    } catch (error) {
      console.error('Error fetching spot details:', error);
    }
  };
};

// Create a new spot
export const createSpot = (spotData) => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/spots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(spotData),
      });
      const newSpot = await response.json();
      dispatch({ type: CREATE_SPOT, payload: newSpot });
    } catch (error) {
      console.error('Error creating spot:', error);
    }
  };
};

// Update an existing spot
export const updateSpot = (id, spotData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(spotData),
      });
      const updatedSpot = await response.json();
      dispatch({ type: UPDATE_SPOT, payload: updatedSpot });
    } catch (error) {
      console.error('Error updating spot:', error);
    }
  };
};

// Delete a spot
export const deleteSpot = (id) => {
  return async (dispatch) => {
    try {
      await fetch(`/api/spots/${id}`, { method: 'DELETE' });
      dispatch({ type: DELETE_SPOT, payload: id });
    } catch (error) {
      console.error('Error deleting spot:', error);
    }
  };
};

// Initial State
const initialState = {
  spots: [],
  spotDetails: null,
};

// Reducer
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPOTS:
      return {
        ...state,
        spots: action.payload,
      };
    case FETCH_SPOT_DETAILS:
      return {
        ...state,
        spotDetails: action.payload,
      };
    case CREATE_SPOT:
      return {
        ...state,
        spots: [...state.spots, action.payload],
      };
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
    default:
      return state;
  }
};

export default spotsReducer;
