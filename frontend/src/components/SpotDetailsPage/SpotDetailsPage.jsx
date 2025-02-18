import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SpotDetailsPage() {
  const { id } = useParams(); // Get the spot ID from the URL
  const spot = useSelector(state => state.spots.find(spot => spot.id === Number(id))); // Ensure id is compared as a number
  const reviews = useSelector(state => state.reviews.filter(review => review.spotId === Number(id))); // Filter reviews for the current spot

  const handleReserve = () => {
    alert("Feature coming soon");
  };

  if (!spot) return <div>Spot not found</div>; // Handle when spot is not found

  const { name, city, state, country, largeImage, images, hostFirstName, hostLastName, avgRating } = spot;

  return (
    <div className="spot-details">
      <h1><strong>{name}</strong></h1>
      <p>{city}, {state}, {country}</p>
      <img src={largeImage} alt={name} />
      <div className="small-images">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`${name} ${index + 1}`} />
        ))}
      </div>
      <p>Hosted by {hostFirstName} {hostLastName}</p>
      <div className="spot-reviews">
        <div>
          <span>★</span> {avgRating || 'New'} · {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
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
