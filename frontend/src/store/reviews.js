// Action Types
const SET_REVIEWS = 'SET_REVIEWS';
const ADD_REVIEW = 'ADD_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';

// Action Creators
export const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  payload: reviews,
});

export const addReview = (review) => ({
  type: ADD_REVIEW,
  payload: review,
});

export const deleteReview = (id) => ({
  type: DELETE_REVIEW,
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

// Initial State
const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

// Reducer
const reviewsReducer = (state = initialState, action) => {
  // Check for special Redux actions and ignore them
  if (action.type.startsWith('@@redux/')) {
    return state;
  }
  
  switch (action.type) {
    case SET_REVIEWS:
      return { ...state, reviews: action.payload };
    case ADD_REVIEW:
      return { ...state, reviews: [...state.reviews, action.payload] };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review.id !== action.payload),
      };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default reviewsReducer;