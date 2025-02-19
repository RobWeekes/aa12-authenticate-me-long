import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotTile from '../SpotTile';
import { fetchSpotById } from '../../store/spots';

function LandingPage() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.spots);

  useEffect(() => {
    dispatch(fetchSpotById());
  }, [dispatch]);

  return (
    <div className="landing-page">
      <h1>Welcome to Our Spot Listings</h1>
      <div className="spots-grid">
      {spots.map(spot => (
          <SpotTile key={spot.id} spot={spot} />
          ))
        }
      </div>
    </div>
  );
}

export default LandingPage;
