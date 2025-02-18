import { useParams } from 'react-router-dom';
import { useSelector} from 'react-redux';

function SpotDetailsPage() {
  const { id } = useParams();
  const spot = useSelector(state => state.spots.find(spot => spot.id === id));
  const reviews = useSelector(state => state.reviews.filter(review => review.spotId === id));

  const handleReserve = () => {
    alert("Feature coming soon");
  };

  return (
    <div className="spot-details">
      <h1><strong>{spot.name}</strong></h1>
      <p>{spot.city}, {spot.state}, {spot.country}</p>
      <img src={spot.largeImage} alt={spot.name} />
      <div className="small-images">
        {spot.images.map((image, index) => (
          <img key={index} src={image} alt={`${spot.name} ${index + 1}`} />
        ))}
      </div>
      <p>Hosted by {spot.hostFirstName} {spot.hostLastName}</p>
      <div className="spot-reviews">
        <div>
          <span>★</span> {spot.avgRating || 'New'} · {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
        </div>
        <button onClick={handleReserve}>Reserve</button>
        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id}>
              <p>{review.firstName} - {review.date}</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpotDetailsPage;