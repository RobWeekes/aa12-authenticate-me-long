import { Link } from 'react-router-dom';

const SpotTile = ({ spot }) => {
  return (
    <Link to={`/spots/${spot.id}`} className="spot-tile">
      <img src={spot.previewImage} alt={spot.name} />
      <div className="spot-info">
        <p>{spot.city}, {spot.state}</p>
        <p>${spot.price} night</p>
      </div>
    </Link>
  );
};

export default SpotTile;