import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { fetchSpotById, deleteSpot } from "../../store/spots";
// use fetchAllSpots instead of fetchSpotById
import { fetchAllSpots, deleteSpot } from "../../store/spots";

const ManageSpotsPage = () => {
  console.log('ManageSpotsPage component rendering');
  const dispatch = useDispatch();
  const spots = useSelector((state) => {
    console.log('ManageSpotsPage selector running, current state:', state);
    return state.spots.spots;
  });
  // useEffect(() => {
  //   dispatch(fetchSpotById());
  // }, [dispatch]);
  // ManageSpotsPage is calling fetchSpotById() without an ID parameter, which would trigger that undefined ID request. ManageSpotsPage should use fetchAllSpots instead since it needs to display all spots managed by the user:
  useEffect(() => {
    console.log('ManageSpotsPage useEffect running');
    dispatch(fetchAllSpots());
  }, [dispatch]);
  // This will resolve the undefined spot ID request we're seeing in the logs.
  const handleDelete = (id) => {
    console.log('Delete attempted for spot id:', id);
    dispatch(deleteSpot(id));
  };

  console.log('ManageSpotsPage spots data:', spots);

  return (
    <div>
      <h1>Manage Spots</h1>
      <ul>
        {spots?.map((spot) => (
          <li key={spot.id}>
            {spot.name}
            <button onClick={() => handleDelete(spot.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSpotsPage;
