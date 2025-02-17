// Actions
const FETCH_REVIEWS = 'FETCH_REVIEWS';
const CREATE_REVIEW = 'CREATE_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';

// Action Creators
export const fetchReviews = (spotId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/spots/${spotId}/reviews`);
      const reviews = await response.json();
      dispatch({ type: FETCH_REVIEWS, payload: reviews });
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
};

export const createReview = (spotId, reviewData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      const newReview = await response.json();
      dispatch({ type: CREATE_REVIEW, payload: newReview });
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };
};

export const deleteReview = (spotId, reviewId) => {
  return async (dispatch) => {
    try {
      await fetch(`/api/spots/${spotId}/reviews/${reviewId}`, { method: 'DELETE' });
      dispatch({ type: DELETE_REVIEW, payload: reviewId });
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
};

// Reducer
const initialState = {
  reviews: [],
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case CREATE_REVIEW:
      return {
        ...state,
        reviews: [action.payload, ...state.reviews],
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reviewsReducer;