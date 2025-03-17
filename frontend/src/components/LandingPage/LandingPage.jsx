// frontend/src/components/LandingPage/LandingPage.jsx
// frontend/src/components/LandingPage/LandingPage.jsx
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import SpotTile from '../SpotTile';
// import { fetchAllSpots } from '../../store/spots';

// function LandingPage() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   // Get authentication state
//   const sessionUser = useSelector(state => state.session.user);

//   // Get spots from the Redux store
//   const spotsFromAllSpots = useSelector(state => Object.values(state.spots.allSpots || {}));
//   const spotsFromSpotsArray = useSelector(state => state.spots.spots || []);

//   // Determine which spots array to use
//   const spots = spotsFromAllSpots.length > 0 ? spotsFromAllSpots : spotsFromSpotsArray;

//   const loading = useSelector(state => state.spots.loading);
//   const error = useSelector(state => state.spots.error);

//   // Fetch spots when the component mounts or when auth state changes
//   useEffect(() => {
//     const loadSpots = async () => {
//       await dispatch(fetchAllSpots());
//       setIsLoaded(true);
//     };

//     loadSpots();
//   }, [dispatch, sessionUser]); // Ensure spots are re-fetched when sessionUser changes

//   // Conditional rendering based on loading and error states
//   if (loading && !isLoaded) {
//     return <div>Loading spots...</div>;
//   }

//   if (error) {
//     return <div>Error fetching spots: {error}</div>;
//   }

//   return (
//     <div className="landing-page">
//       <div className="spots-grid">
//         {spots.length > 0 ? (
//           spots.map(spot => (
//             <SpotTile key={spot.id} spot={spot} />
//           ))
//         ) : (
//           <div>No spots available at the moment.</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default LandingPage;

// frontend/src/components/LandingPage/LandingPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotTile from '../SpotTile';
import { fetchAllSpots } from '../../store/spots';

function LandingPage() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // Get authentication state
  // const sessionUser = useSelector(state => state.session.user);

  // Get spots from the Redux store
  const spotsFromAllSpots = useSelector(state => Object.values(state.spots.allSpots || {}));
  const spotsFromSpotsArray = useSelector(state => state.spots.spots || []);

  // Determine which spots array to use
  const spots = spotsFromAllSpots.length > 0 ? spotsFromAllSpots : spotsFromSpotsArray;

  const loading = useSelector(state => state.spots.loading);
  const error = useSelector(state => state.spots.error);

  // Fetch spots when the component mounts or when auth state changes
  useEffect(() => {
    const loadSpots = async () => {
      try {
        await dispatch(fetchAllSpots());
      } catch (err) {
        console.error("Error loading spots:", err);
      } finally {
        setIsLoaded(true);
      }
    };

    loadSpots();
  }, [dispatch]); // Removed sessionUser dependency to prevent unnecessary refetching

  // Conditional rendering based on loading and error states
  if (loading && !isLoaded) {
    return <div>Loading spots...</div>;
  }

  if (error) {
    return <div>Error fetching spots: {error}</div>;
  }

  return (
    // <div className="landing-page">
    <div className="landing-page-container">
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

