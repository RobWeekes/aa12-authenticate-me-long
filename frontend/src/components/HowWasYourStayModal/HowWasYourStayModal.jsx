import { useState } from 'react';

const HowWasYourStayModal = ({ isOpen, onClose, onSubmitReview }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (review.length < 10 || rating === 0) {
      setError('Review must be at least 10 characters and a star rating must be selected.');
    } else {
      onSubmitReview({ review, rating });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>How was your stay?</h2>
      <textarea
        placeholder="Leave your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <div>
        <label>Stars</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleSubmit}>Submit Your Review</button>
    </div>
  );
};

export default HowWasYourStayModal;