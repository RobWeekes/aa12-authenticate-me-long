// frontend/src/components/HowWasYourStayModal/HowWasYourStayModal.jsx
// frontend/src/components/HowWasYourStayModal/HowWasYourStayModal.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createReview } from '../../store/reviews';
import './HowWasYourStayModal.css';

function HowWasYourStayModal({ spotId, onReviewSubmit }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [activeRating, setActiveRating] = useState(0);
  const [errors, setErrors] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear errors when user starts typing or changes rating
  useEffect(() => {
    if (errors) setErrors('');
  }, [review, stars, errors]);

  // Function to handle mouse enter on stars
  const handleStarHover = (starIndex) => {
    setActiveRating(starIndex);
  };

  // Function to handle mouse leave on stars container
  const handleMouseLeave = () => {
    setActiveRating(stars);
  };

  // Function to handle star click
  const handleStarClick = (starIndex) => {
    setStars(starIndex);
    setActiveRating(starIndex);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (review.length < 10 || stars === 0) {
      setErrors('Review must be at least 10 characters and a star rating must be selected.');
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(createReview(spotId, { review, stars }));
      
      // Call the callback function if provided
      if (typeof onReviewSubmit === 'function') {
        onReviewSubmit();
      }
      
      closeModal();
    } catch (error) {
      console.error("Error submitting review:", error);
      if (error.errors) {
        setErrors(Object.values(error.errors).join(', '));
      } else {
        setErrors(error.message || 'An error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="how-was-your-stay-modal">
      <h2>How was your stay?</h2>
      
      {errors && <p className="review-error">{errors}</p>}
      
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Leave your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          disabled={isSubmitting}
          rows={5}
          aria-label="Review text"
        />
        
        <div className="stars-rating-container">
          <div
            className="stars-container"
            onMouseLeave={handleMouseLeave}
          >
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <div
                key={starIndex}
                className="star-wrapper"
                onMouseEnter={() => handleStarHover(starIndex)}
                onClick={() => handleStarClick(starIndex)}
                role="button"
                aria-label={`${starIndex} star${starIndex !== 1 ? 's' : ''}`}
              >
                {activeRating >= starIndex ? (
                  <i className="fas fa-star filled-star"></i>
                ) : (
                  <i className="far fa-star empty-star"></i>
                )}
              </div>
            ))}
            <span className="stars-text">Stars</span>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || review.length < 10 || stars < 1}
          className="submit-review-button"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Your Review'}
        </button>
      </form>
    </div>
  );
}

export default HowWasYourStayModal;
