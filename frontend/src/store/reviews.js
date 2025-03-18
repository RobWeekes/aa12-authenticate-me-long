// // frontend/src/store/reviews.js
// import { csrfFetch } from './csrf';

// // Action Types
// const SET_REVIEWS = 'SET_REVIEWS';
// const ADD_REVIEW = 'ADD_REVIEW';
// const DELETE_REVIEW = 'DELETE_REVIEW';
// const SET_LOADING = 'SET_LOADING';
// const SET_ERROR = 'SET_ERROR';

// // Action Creators

// // Fetch Reviews for a Spot
// export const fetchSpotReviews = (spotId) => async (dispatch) => {
//   dispatch(setLoading(true)); // Start loading state
//   try {
//     const response = await fetch(`/api/spots/${spotId}/reviews`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch reviews');
//     }

//     const data = await response.json();
//     dispatch(setReviews(data.Reviews || data));
//     return data.Reviews || data;
//   } catch (error) {
//     dispatch(setError(error.message));
//     return [];
//   } finally {
//     dispatch(setLoading(false)); // End loading state after response is received
//   }
// };

// // Create a new review for a spot
// export const createReview = (spotId, reviewData) => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(reviewData)
//     });
    
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw errorData;
//     }
    
//     const newReview = await response.json();
//     dispatch(addReview(newReview));
//     return newReview;
//   } catch (error) {
//     console.error('Error creating review:', error);
//     dispatch(setError(error.message || 'Failed to create review'));
//     throw error;
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// // Delete a review
// export const deleteUserReview = (reviewId) => async (dispatch) => {
//   dispatch(setLoading(true));
//   try {
//     const response = await csrfFetch(`/api/reviews/${reviewId}`, {
//       method: 'DELETE'
//     });
    
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Failed to delete review');
//     }
    
//     dispatch(deleteReview(reviewId));
//     return true;
//   } catch (error) {
//     console.error('Error deleting review:', error);
//     dispatch(setError(error.message));
//     throw error;
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// // Set Reviews to Redux State
// export const setReviews = (reviews) => ({
//   type: SET_REVIEWS,
//   payload: reviews,
// });

// // Add a New Review
// export const addReview = (review) => ({
//   type: ADD_REVIEW,
//   payload: review,
// });

// // Delete a Review
// export const deleteReview = (id) => ({
//   type: DELETE_REVIEW,
//   payload: id,
// });

// // Set Loading State (for async actions)
// export const setLoading = (loading) => ({
//   type: SET_LOADING,
//   payload: loading,
// });

// // Set Error Message
// export const setError = (error) => ({
//   type: SET_ERROR,
//   payload: error,
// });

// // Initial State
// const initialState = {
//   reviews: [],
//   loading: false,
//   error: null,
// };

// // Reducer
// const reviewsReducer = (state = initialState, action) => {
//   // Handle Redux internal actions
//   if (action.type.startsWith('@@redux/')) {
//     return state;
//   }

//   switch (action.type) {
//     case SET_REVIEWS:
//       return { ...state, reviews: action.payload, error: null };
//     case ADD_REVIEW:
//       return { ...state, reviews: [action.payload, ...state.reviews], error: null };
//     case DELETE_REVIEW:
//       return {
//         ...state,
//         reviews: state.reviews.filter(review => review.id !== action.payload),
//         error: null
//       };
//     case SET_LOADING:
//       return { ...state, loading: action.payload };
//     case SET_ERROR:
//       return { ...state, error: action.payload };
//     default:
//       return state;
//   }
// };

// export default reviewsReducer;




// frontend/src/store/reviews.js
import { csrfFetch } from './csrf';

// Action Types
const SET_REVIEWS = 'SET_REVIEWS';
const ADD_REVIEW = 'ADD_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';

// Action Creators

// Fetch Reviews for a Spot
export const fetchSpotReviews = (spotId) => async (dispatch) => {
  dispatch(setLoading(true)); // Start loading state
  try {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    const data = await response.json();
    dispatch(setReviews(data.Reviews || data));
    return data.Reviews || data;
  } catch (error) {
    dispatch(setError(error.message));
    return [];
  } finally {
    dispatch(setLoading(false)); // End loading state after response is received
  }
};

// Create a new review for a spot
export const createReview = (spotId, reviewData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    
    const newReview = await response.json();
    dispatch(addReview(newReview));
    return newReview;
  } catch (error) {
    console.error('Error creating review:', error);
    dispatch(setError(error.message || 'Failed to create review'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

// Delete a review
export const removeReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
});

// Set Reviews to Redux State
export const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  payload: reviews,
});

// Add a New Review
export const addReview = (review) => ({
  type: ADD_REVIEW,
  payload: review,
});

// Thunk Action for Deleting a Review
export const deleteReview = (reviewId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      dispatch(removeReview(reviewId));
      return true;
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

// Set Loading State (for async actions)
export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

// Set Error Message
export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

// Initial State
const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

// Reducer
const reviewsReducer = (state = initialState, action) => {
  // Handle Redux internal actions
  if (action.type.startsWith('@@redux/')) {
    return state;
  }

  switch (action.type) {
    case SET_REVIEWS:
      return { ...state, reviews: action.payload, error: null };
    case ADD_REVIEW:
      return { ...state, reviews: [action.payload, ...state.reviews], error: null };
      case DELETE_REVIEW: {
        const newState = { ...state };
        const newReviews = { ...newState.reviews };
        delete newReviews[action.reviewId];
        return {
          ...newState,
          reviews: newReviews
        };
      }
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default reviewsReducer;

