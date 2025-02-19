import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotById } from '../../store/spots';
import { fetchSpotReviews } from '../../store/reviews';

function SpotDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector(state => state.spots.spots.find(spot => spot.id === Number(id)));
  const reviews = useSelector(state => state.reviews.reviews);

  useEffect(() => {
    dispatch(fetchSpotById(id));
    dispatch(fetchSpotReviews(id));
  }, [dispatch, id]);

  if (!spot) return <div>Loading...</div>;

  return (
    <div className="spot-details">
      <h1><strong>{spot.name}</strong></h1>
      <p>{spot.city}, {spot.state}, {spot.country}</p>
      
      <div className="spot-images">
        <img src={spot.previewImage} alt={spot.name} className="main-image" />
        {spot.images?.map((image, index) => (
          <img key={index} src={image} alt={`${spot.name} ${index + 1}`} />
        ))}
      </div>

      <div className="spot-info">
        <h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
        <p>{spot.description}</p>
        
        <div className="price-rating">
          <span>${spot.price} night</span>
          <span>★ {spot.avgRating || 'New'}</span>
        </div>

        <button onClick={() => alert("Feature coming soon")}>Reserve</button>

        <div className="reviews-section">
          <h3>Reviews ({reviews.length})</h3>
          {reviews.map(review => (
            <div key={review.id} className="review">
              <p>{review.User?.firstName}</p>
              <p>{new Date(review.createdAt).toLocaleDateString()}</p>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpotDetailsPage;