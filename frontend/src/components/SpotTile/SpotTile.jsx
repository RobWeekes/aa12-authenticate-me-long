import { Link } from 'react-router-dom';

const SpotTile = ({ spot }) => {
  return (
    <div className="spot-tile">
      <Link to={`/spots/${spot.id}`}>
        <img src={spot.previewImageUrl} alt={spot.title} />
        <h3>{spot.title}</h3>
        <p>{spot.city}, {spot.state}</p>
        <p>{spot.price} per night</p>
      </Link>
    </div>
  );
};

export default SpotTile;
