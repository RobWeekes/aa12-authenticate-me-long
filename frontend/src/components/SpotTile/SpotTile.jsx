import { Link } from 'react-router-dom';

const SpotTile = ({ spot }) => {
  if (!spot) return null; // Ensure spot data exists

  const { previewImage, name, city, state, price, id } = spot;

  return (
    <Link to={`/spots/${id}`} className="spot-tile">
      <img src={previewImage} alt={name} />
      <div className="spot-info">
        <p>{city}, {state}</p>
        <p>${price} per night</p>
      </div>
    </Link>
  );
};

export default SpotTile;
