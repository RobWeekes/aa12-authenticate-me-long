// frontend/src/components/ManageSpotsPage/ManageSpotsPage.jsx
// // frontend/src/components/ManageSpotsPage/ManageSpotsPage.jsx

// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { fetchUserSpots } from '../../store/spots';
// import OpenModalButton from '../OpenModalButton';
// import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
// import './ManageSpotsPage.css';

// const ManageSpotsPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isLoaded, setIsLoaded] = useState(false);
  
//   const user = useSelector(state => state.session.user);
  
//   // Add more detailed logging for the spots selector
//   const spots = useSelector((state) => {
//     console.log('ManageSpotsPage selector running, spots state:', state.spots);
//     console.log('userSpots array:', state.spots.userSpots);
    
//     // Make sure we're getting an array
//     return Array.isArray(state.spots.userSpots) ? state.spots.userSpots : [];
//   });
  
//   const loading = useSelector(state => state.spots.loading);
//   const error = useSelector(state => state.spots.error);

//   useEffect(() => {
//     // Redirect if not logged in
//     if (!user) {
//       navigate('/');
//       return;
//     }
    
//     // Fetch user spots and set isLoaded when complete
//     const loadSpots = async () => {
//       try {
//         await dispatch(fetchUserSpots());
//         console.log('Spots loaded successfully');
//       } catch (err) {
//         console.error('Error loading spots:', err);
//       } finally {
//         setIsLoaded(true);
//       }
//     };
    
//     loadSpots();
//   }, [dispatch, user, navigate]);

//   const handleCreateNewSpot = () => {
//     navigate('/spots/new');
//   };

//   const handleUpdateSpot = (spotId) => {
//     navigate(`/spots/${spotId}/edit`);
//   };

//   // Function to manually refresh spots
//   const refreshSpots = async () => {
//     console.log('Manually refreshing spots');
//     try {
//       await dispatch(fetchUserSpots());
//     } catch (err) {
//       console.error('Error refreshing spots:', err);
//     }
//   };

//   console.log('ManageSpotsPage render - spots:', spots, 'loading:', loading, 'isLoaded:', isLoaded);

//   // Show loading state while fetching data
//   if (loading && !isLoaded) {
//     return <div className="loading">Loading your spots...</div>;
//   }

//   // Show error if there is one
//   if (error) {
//     return (
//       <div className="error">
//         <p>Error: {error}</p>
//         <button onClick={refreshSpots}>Try Again</button>
//       </div>
//     );
//   }

//   return (
//     <div className="manage-spots-container">
//       <h1>Manage Your Spots</h1>
      
//       <button
//         className="create-spot-button"
//         onClick={handleCreateNewSpot}
//       >
//         Create a New Spot
//       </button>
      
//       {/* Add a refresh button for debugging */}
//       <button onClick={refreshSpots} className="refresh-button">
//         Refresh Spots
//       </button>
      
//       <div className="spots-grid">
//         {spots && spots.length > 0 ? (
//           spots.map(spot => (
//             <div key={spot.id} className="spot-card">
//               <NavLink to={`/spots/${spot.id}`} className="spot-link">
//                 <div className="spot-image-container">
//                   <img
//                     src={spot.previewImage || 'https://via.placeholder.com/300x200?text=No+Image'}
//                     alt={spot.name}
//                     className="spot-image"
//                   />
//                 </div>
//                 <div className="spot-info">
//                   <div className="spot-location-rating">
//                     <p className="spot-location">{spot.city}, {spot.state}</p>
//                     <p className="spot-rating">
//                       <i className="fas fa-star"></i>
//                       {spot.avgRating ? Number(spot.avgRating).toFixed(1) : 'New'}
//                     </p>
//                   </div>
//                   <p className="spot-price">${Number(spot.price).toFixed(2)} <span>night</span></p>
//                 </div>
//               </NavLink>
              
//               <div className="spot-actions">
//                 <button
//                   className="update-button"
//                   onClick={() => handleUpdateSpot(spot.id)}
//                 >
//                   Update
//                 </button>
                
//                 <OpenModalButton
//                   buttonText="Delete"
//                   className="delete-button"
//                   modalComponent={<DeleteSpotModal spotId={spot.id} onSuccessfulDelete={refreshSpots} />}
//                 />
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="no-spots-container">
//             <p className="no-spots-message">You don&apos;t have any spots yet.</p>
//             <p className="debug-info">Debug info: isLoaded={isLoaded.toString()}, spotsLength={spots ? spots.length : 'undefined'}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageSpotsPage;






// frontend/src/components/ManageSpotsPage/ManageSpotsPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchUserSpots } from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import './ManageSpotsPage.css';

const ManageSpotsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  
  // Add more detailed logging for the spots selector
  const spots = useSelector((state) => {
    console.log('ManageSpotsPage selector running, spots state:', state.spots);
    console.log('userSpots array:', state.spots.userSpots);
    // Make sure we're getting an array
    return Array.isArray(state.spots.userSpots) ? state.spots.userSpots : [];
  });
  
  const loading = useSelector(state => state.spots.loading);
  const error = useSelector(state => state.spots.error);

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/');
      return;
    }
    
    // Fetch user spots and set isLoaded when complete
    const loadSpots = async () => {
      try {
        // Force a fresh fetch every time the component mounts
        await dispatch(fetchUserSpots());
        console.log('Spots loaded successfully');
      } catch (err) {
        console.error('Error loading spots:', err);
      } finally {
        setIsLoaded(true);
      }
    };
    
    loadSpots();
  }, [dispatch, user, navigate]);

  const handleCreateNewSpot = () => {
    navigate('/spots/new');
  };

  const handleUpdateSpot = (spotId) => {
    navigate(`/spots/${spotId}/edit`);
  };

  // Function to manually refresh spots
  const refreshSpots = async () => {
    console.log('Manually refreshing spots');
    setIsLoaded(false); // Reset loaded state
    try {
      await dispatch(fetchUserSpots());
      console.log('Spots refreshed successfully');
    } catch (err) {
      console.error('Error refreshing spots:', err);
    } finally {
      setIsLoaded(true);
    }
  };

  console.log('ManageSpotsPage render - spots:', spots, 'loading:', loading, 'isLoaded:', isLoaded);

  // Show loading state while fetching data
  if (loading && !isLoaded) {
    return <div className="loading">Loading your spots...</div>;
  }

  // Show error if there is one
  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={refreshSpots}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="manage-spots-container">
      <h1>Manage Spots</h1>
      <div className="manage-spots-actions">
        <button
          className="create-spot-button"
          onClick={handleCreateNewSpot}
        >
          Create a New Spot
        </button>
      </div>
      
      <div className="spots-grid">
        {spots && spots.length > 0 ? (
          spots.map(spot => (
            <div key={spot.id} className="spot-card">
              <NavLink to={`/spots/${spot.id}`} className="spot-link">
                <div className="spot-image-container">
                  <img
                    src={spot.previewImage || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={spot.name}
                    className="spot-image"
                  />
                </div>
                <div className="spot-info">
                  <div className="spot-location-rating">
                    <p className="spot-location">{spot.city}, {spot.state}</p>
                    <p className="spot-rating">
                      <i className="fas fa-star"></i>
                      {spot.avgRating ? Number(spot.avgRating).toFixed(1) : 'New'}
                    </p>
                  </div>
                  <p className="spot-price">${Number(spot.price).toFixed(2)} <span>night</span></p>
                </div>
              </NavLink>
              <div className="spot-actions">
                <button
                  className="update-button"
                  onClick={() => handleUpdateSpot(spot.id)}
                >
                  Update
                </button>
                <OpenModalButton
                  buttonText="Delete"
                  className="delete-button"
                  modalComponent={<DeleteSpotModal spotId={spot.id} onSuccessfulDelete={refreshSpots} />}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="no-spots-container">
            <p className="no-spots-message">You don&apos;t have any spots yet.</p>
            <p className="debug-info">Debug info: isLoaded={isLoaded.toString()}, spotsLength={spots ? spots.length : 'undefined'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSpotsPage;

