import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotTile from '../SpotTile';
import { fetchSpots } from '../../store/spots';

function LandingPage() {
  const dispatch = useDispatch();
  const { spots = [], loading } = useSelector(state => state.spots); // Ensure spots is an array

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="landing-page">
      <h1>Welcome to Our Spot Listings</h1>
      <div className="spot-list">
        {spots.length === 0 ? (
          <p>No spots available</p>
        ) : (
          spots.map(spot => (
            <SpotTile key={spot.id} spot={spot} />
          ))
        )}
      </div>
    </div>
  );
}

export default LandingPage;
