// frontend/src/components/SpotDetailsPage/SpotDetailsPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpotById } from '../../store/spots';
import { fetchSpotReviews } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import HowWasYourStayModal from '../HowWasYourStayModal/HowWasYourStayModal';
import '../../styles/spotDetails.css';

function SpotDetailsPage() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  
  // Get the spot from Redux store
  const spot = useSelector(state => state.spots.singleSpot);
  const loading = useSelector(state => state.spots.loading);
  const error = useSelector(state => state.spots.error);
  
  // Get reviews from Redux store
  const reviewsObj = useSelector(state => state.reviews.reviews || {});
  // Convert reviews object to array if needed
  const reviews = Array.isArray(reviewsObj) ? reviewsObj : Object.values(reviewsObj);
  
  // Get current user
  const sessionUser = useSelector(state => state.session.user);

  // Fetch spot and reviews when component mounts
  useEffect(() => {
    if (spotId) {
      dispatch(fetchSpotById(spotId));
      dispatch(fetchSpotReviews(spotId));
    }
  }, [dispatch, spotId]);

  // Handle successful review submission
  const handleReviewSubmit = () => {
    // Refresh reviews after submission
    dispatch(fetchSpotReviews(spotId));
    // Refresh spot to update ratings
    dispatch(fetchSpotById(spotId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!spot) {
    return <div>No spot found</div>;
  }

  // Check if the logged-in user has already posted a review for this spot
  const hasReviewed = sessionUser ? reviews.some(review => 
    review.userId === sessionUser.id || review.User?.id === sessionUser.id
  ) : false;
  
  // Check if the logged-in user is the owner of the spot
  const isOwner = sessionUser && sessionUser.id === spot.ownerId;

  // Determine if we should show the "Post Your Review" button
  const showPostReviewButton = sessionUser && !hasReviewed && !isOwner;

  // Format reviews to show newest first
  const sortedReviews = [...reviews].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="spot-details-container">
      <h1>{spot.name}</h1>
      <p>{spot.city}, {spot.state}, {spot.country}</p>

      <div className="spot-images">
        {spot.SpotImages && spot.SpotImages.length > 0 ? (
          spot.SpotImages.map((image, index) => (
            <img 
              key={index} 
              src={image.url} 
              alt={`${spot.name} ${index + 1}`} 
              className={index === 0 ? 'main-image' : 'secondary-image'}
            />
          ))
        ) : (
          <img 
            src="https://via.placeholder.com/400x300?text=No+Image" 
            alt="No image available" 
            className="main-image"
          />
        )}
      </div>

      <div className="spot-info">
        <div className="host-info">
          <h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
          <p>{spot.description}</p>
        </div>

        <div className="booking-info">
          <div className="price-rating">
            <span className="price">${spot.price} night</span>
            <span className="rating">
              ★ {spot.avgStarRating ? Number(spot.avgStarRating).toFixed(1) : 'New'} 
              {spot.numReviews > 0 && ` · ${spot.numReviews} ${spot.numReviews === 1 ? 'review' : 'reviews'}`}
            </span>
          </div>
          <button className="reserve-button" onClick={() => alert("Feature coming soon")}>
            Reserve
          </button>
        </div>
      </div>

      <div className="reviews-section">
        <h3>
          ★ {spot.avgStarRating ? Number(spot.avgStarRating).toFixed(1) : 'New'} 
          {spot.numReviews > 0 && ` · ${spot.numReviews} ${spot.numReviews === 1 ? 'review' : 'reviews'}`}
        </h3>
        
        {/* Show "Post Your Review" button only if the user is logged in, hasn't reviewed, and is not the owner */}
        {showPostReviewButton && (
          <div className="post-review-button">
            <OpenModalButton
              buttonText="Post Your Review"
              modalComponent={<HowWasYourStayModal spotId={spotId} onReviewSubmit={handleReviewSubmit} />}
            />
          </div>
        )}
        
        {/* Show "Be the first to post a review!" message if there are no reviews and user is logged in but not the owner */}
        {reviews.length === 0 && sessionUser && !isOwner && (
          <p>Be the first to post a review!</p>
        )}
        
        {/* Display reviews */}
        <div className="reviews-list">
          {sortedReviews.map(review => (
            <div key={review.id} className="review">
              <h4>{review.User?.firstName}</h4>
              <p className="review-date">
                {new Date(review.createdAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric'
                })}
              </p>
              <p className="review-text">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpotDetailsPage;
