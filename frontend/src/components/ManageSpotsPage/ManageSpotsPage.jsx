import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSpots, deleteSpot } from "../../store/spots";  // Correct import

const ManageSpotsPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.spots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteSpot(id));
  };

  return (
    <div>
      <h1>Manage Spots</h1>
      <ul>
        {spots.map((spot) => (
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