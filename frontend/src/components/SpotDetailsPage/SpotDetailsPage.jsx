// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSpotById } from '../../store/spots';
// import { fetchSpotReviews } from '../../store/reviews';

// function SpotDetailsPage() {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   console.log('SpotDetailsPage ID from params:', id);
//   const spot = useSelector(state => state.spots.spots.find(spot => spot.id === Number(id)));
//   const reviews = useSelector(state => state.reviews.reviews);
//   const sessionUser = useSelector(state => state.session.user);
//   // Early return if no valid ID - avoids API call errors
//   // The useEffect hook is being called after a conditional return
//   // Let's move the validation inside useEffect to maintain proper hook order:
//   // if (!id || isNaN(id)) return <div>Invalid Spot ID</div>;
//   useEffect(() => {
//     if (id && !isNaN(id)) {
//       dispatch(fetchSpotById(id));
//       dispatch(fetchSpotReviews(id));
//     }
//   }, [dispatch, id]);

//   if (!id || isNaN(id)) return <div>Invalid Spot ID</div>;
//   if (!spot) return <div>Loading...</div>;

//   // Check if the logged-in user has already posted a review for this spot
//   const hasReviewed = reviews.some(review => review.userId === sessionUser?.id);
//   const isOwner = sessionUser?.id === spot.ownerId; // Assuming spot has ownerId

//   return (
//     <div className="spot-details">
//       <h1><strong>{spot.name}</strong></h1>
//       <p>{spot.city}, {spot.state}, {spot.country}</p>

//       <div className="spot-images">
//         <img src={spot.previewImage} alt={spot.name} className="main-image" />
//         {spot.images?.map((image, index) => (
//           <img key={index} src={image} alt={`${spot.name} ${index + 1}`} />
//         ))}
//       </div>

//       <div className="spot-card">
//         <h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
//         <p>{spot.description}</p>

//         <div className="price-rating">
//           <span>${spot.price} night</span>
//           <span>★ {spot.avgRating || 'New'}</span>
//         </div>

//         <button onClick={() => alert("Feature coming soon")}>Reserve</button>

//         <div className="reviews-section">
//           <h3>Reviews ({reviews.length})</h3>
//           {reviews.map(review => (
//             <div key={review.id} className="review">
//               <p>{review.User?.firstName}</p>
//               <p>{new Date(review.createdAt).toLocaleDateString()}</p>
//               <p>{review.review}</p>
//             </div>
//           ))}
//         </div>

//         {/* Show "Post Your Review" button only if the user is logged in, hasn't reviewed, and is not the owner */}
//         {sessionUser && !hasReviewed && !isOwner && (
//           <button onClick={() => alert("Feature coming soon")}>Post Your Review</button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SpotDetailsPage;





// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSpotById } from '../../store/spots';
// import { fetchSpotReviews } from '../../store/reviews';

// function SpotDetailsPage() {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   console.log('SpotDetailsPage ID from params:', id);
//   const spot = useSelector(state => state.spots.spots.find(spot => spot.id === Number(id)));
//   const reviews = useSelector(state => state.reviews.reviews);
//   const sessionUser = useSelector(state => state.session.user);

//   // UseEffect for fetching spot and reviews
//   useEffect(() => {
//     if (id && !isNaN(id)) {
//       dispatch(fetchSpotById(id));
//       dispatch(fetchSpotReviews(id));
//     }
//   }, [dispatch, id]);

//   if (!id || isNaN(id)) return <div>Invalid Spot ID</div>;
//   if (!spot) return <div>Loading...</div>;

//   // Check if the logged-in user has already posted a review for this spot
//   const hasReviewed = reviews.some(review => review.userId === sessionUser?.id);
//   const isOwner = sessionUser?.id === spot.ownerId; // Assuming spot has ownerId

//   return (
//     <div className="spot-details">
//       <h1><strong>{spot.name}</strong></h1>
//       <p>{spot.city}, {spot.state}, {spot.country}</p>

//       <div className="spot-images">
//         <img src={spot.previewImage} alt={spot.name} className="main-image" />
//         {spot.images?.map((image, index) => (
//           <img key={index} src={image} alt={`${spot.name} ${index + 1}`} />
//         ))}
//       </div>

//       <div className="spot-card">
//         <h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
//         <p>{spot.description}</p>

//         <div className="price-rating">
//           <span>${spot.price} night</span>
//           <span>★ {spot.avgRating || 'New'}</span>
//         </div>

//         <button onClick={() => alert("Feature coming soon")}>Reserve</button>

//         <div className="reviews-section">
//           <h3>Reviews ({reviews.length})</h3>
//           {reviews.length > 0 ? (
//             reviews.map(review => (
//               <div key={review.id} className="review">
//                 <p>{review.User?.firstName}</p>
//                 <p>{new Date(review.createdAt).toLocaleDateString()}</p>
//                 <p>{review.review}</p>
//               </div>
//             ))
//           ) : (
//             <p>No reviews yet.</p>
//           )}
//         </div>

//         {/* Show "Post Your Review" button only if the user is logged in, hasn't reviewed, and is not the owner */}
//         {sessionUser && !hasReviewed && !isOwner && (
//           <button onClick={() => alert("Feature coming soon")}>Post Your Review</button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SpotDetailsPage;












// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// function SpotDetailsPage() {
//   const { spotId } = useParams();
//   const [spot, setSpot] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSpotDetails = async () => {
//       try {
//         const response = await fetch(`/api/spots/${spotId}`);
//         if (!response.ok) {
//           throw new Error('Spot not found');
//         }
//         const data = await response.json();
//         setSpot(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSpotDetails();
//   }, [spotId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!spot) {
//     return <div>No spot found</div>;
//   }

//   return (
//     <div>
//       <h1>{spot.name}</h1>
//       <p>{spot.description}</p>
//       <p>Price: ${spot.price}</p>
//       <p>Location: {spot.city}, {spot.state}</p>
//       {/* Render other spot details here */}
//     </div>
//   );
// }

// export default SpotDetailsPage;
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpotById } from '../../store/spots';

function SpotDetailsPage() {
  // First, set up your hooks and get the spotId:
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.spots?.[0]?.spotdata);
  const spotImage = useSelector(state => state.spots.spots?.[0]?.spotdata?.SpotImages?.[0])
  console.log('IMAGE FROM SPOT DETAILS:', spotImage);
  // const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  // The build process was stopped by ESLint errors: 'setLoading' / 'setError' is assigned a value but never used
  // const [loading] = useState(true);
  // const [error] = useState(null);
  // Then use useEffect to fetch the data when the component mounts:
  useEffect(() => {
    if (spotId) {
      // const detail = dispatch(fetchSpotById(spotId));
      dispatch(fetchSpotById(spotId));
      setLoading(false);
      // console.log("DISPATCH DETAILS FROM SPOT DETAILS PAGE:", detail)
    }
  }, [dispatch, spotId])
  // }, [detail, spotId])

  // useEffect(() => {
  //   const fetchSpotDetails = async () => {
  //     try {
  //       const response = await fetch(`/api/spots/${spotId}`);
  //       if (!response.ok) {
  //         throw new Error('Spot not found');
  //       }
  //       const data = await response.json();
  //       setSpot(data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSpotDetails();
  // }, [spotId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!spot) {
    return <div>No spot found</div>;
  }

  // const { name, description, price, city, state, previewImage, images, avgRating, Owner } = spot;

  return (
    <>
      {/* ensure the component waits for the spot data and SpotImages to be available before attempting to render them */}
      {spot && spot.SpotImages && (
        <div className="spot-details">

          <h1><strong>{spot.name}</strong></h1>
          <p>{spot.description}</p>
          <p>Price: ${spot.price} per night</p>
          <p>Location: {spot.city}, {spot.state}</p>

          {/* Spot images */}
          <div className="spot-images">
            <img src={spot?.SpotImages?.[0]?.url} alt={spot.name} className="main-image" />
            {spotImage && (
              <img src={spotImage?.url} alt={spot.name} />
            )}
          </div>

          {/* Host information */}
          {/* {Owner && ( */}
          <div className="host-info">
            <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
          </div>
          {/* )} */}

          {/* Restore this later \/ */}

          {/* Ratings and Reviews */}
          {/* <div className="price-rating">
        <span>${price} per night</span>
        <span>★ {avgRating || "New"}</span>
      </div> */}

          {/* Show Reviews */}
          {/* <div className="reviews-section">
        <h3>Reviews</h3>
        {spot.reviews && spot.reviews.length > 0 ? (
          spot.reviews.map(review => (
            <div key={review.id} className="review">
              <p>{review.User.firstName} {review.User.lastName}</p>
              <p>{new Date(review.createdAt).toLocaleDateString()}</p>
              <p>{review.review}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div> */}

          {/* Action buttons (e.g., "Post Your Review", "Reserve") */}
          <div className="action-buttons">
            <button onClick={() => alert("Feature coming soon")}>Reserve</button>
            <button onClick={() => alert("Feature coming soon")}>Post Your Review</button>
          </div>
        </div>
      )}
    </>
  );
}

export default SpotDetailsPage;
