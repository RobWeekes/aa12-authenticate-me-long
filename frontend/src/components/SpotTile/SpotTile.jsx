// frontend/src/components/SpotTile/SpotTile.jsx
import { Link } from 'react-router-dom';
import './SpotTile.css';

const SpotTile = ({ spot }) => {
  if (!spot || !spot.id) return null; // Ensure spot data exists,
  // Ensure all SpotTile links have valid IDs

  const { previewImage, name, city, state, price, id } = spot;

  return (
    <div className="spot-card">
      {/* <Link to={`/spots/${id}`} className="spot-tile"> */}
      <Link to={`/spots/${id}`} className="spot-card img">
      <img src={previewImage} alt={name} />
        <p>{name}</p>
        <p>{city}, {state}</p>
        <p>${price} per night</p>
      </Link>
    </div>
  );
};

export default SpotTile;
