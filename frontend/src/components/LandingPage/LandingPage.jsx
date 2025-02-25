// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import SpotTile from '../SpotTile';
// import { fetchAllSpots } from '../../store/spots';
// // import { fetchSpotById } from '../../store/spots';

// function LandingPage() {
//   const dispatch = useDispatch();
//   const spots = useSelector(state => {
//     console.log('Current state on LandingPage:', state);
//     return state.spots.spots || [];
//   });
//   console.log('spots from landing page:', spots);

//   useEffect(() => {
//     dispatch(fetchAllSpots());
//   }, [dispatch]);

//   return (
//     <div className="landing-page">
//       {/* <h1>Welcome to Our Spot Listings</h1> */}
//       <div className="spots-grid">
//       {
//       spots && spots.length > 0 && spots.map(spot => (
//           <SpotTile key={spot.id} spot={spot} />
//           ))
//         }
//       </div>
//     </div>
//   );
// }

// export default LandingPage;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotTile from '../SpotTile';
import { fetchAllSpots } from '../../store/spots';

function LandingPage() {
  const dispatch = useDispatch();

  // Get spots from the Redux store
  const spots = useSelector(state => state.spots.spots || []);
  const loading = useSelector(state => state.spots.loading); // Assuming you have loading state
  const error = useSelector(state => state.spots.error); // Assuming you handle error state

  // Log the current state for debugging
  console.log('Current state on LandingPage:', spots);

  // Fetch spots when the component mounts
  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  // Conditional rendering based on loading and error states
  if (loading) {
    return <div>Loading spots...</div>;
  }

  if (error) {
    return <div>Error fetching spots: {error}</div>;
  }

  return (
    <div className="landing-page">
      {/* <h1>Welcome to Our Spot Listings</h1> */}
      <div className="spots-grid">
        {spots.length > 0 ? (
          spots.map(spot => (
            <SpotTile key={spot.id} spot={spot} />
          ))
        ) : (
          <div>No spots available at the moment.</div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
