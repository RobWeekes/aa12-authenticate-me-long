import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotTile from '../SpotTile';
import { fetchAllSpots } from '../../store/spots';
// import { fetchSpotById } from '../../store/spots';

function LandingPage() {
  const dispatch = useDispatch();
  const spots = useSelector(state => {
    console.log('Current state:', state);
    return state.spots.spots || [];
  });
  console.log('spots from landing page:', spots);

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  return (
    <div className="landing-page">
      <h1>Welcome to Our Spot Listings</h1>
      <div className="spots-grid">
      {
      spots && spots.length > 0 && spots.map(spot => (
          <SpotTile key={spot.id} spot={spot} />
          ))
        }
      </div>
    </div>
  );
}

export default LandingPage;
