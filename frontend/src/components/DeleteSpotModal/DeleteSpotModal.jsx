// frontend/src/components/DeleteSpotModal/DeleteSpotModal.jsx
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal';
// import { deleteSpotThunk, fetchUserSpots } from '../../store/spots';
// import './DeleteSpotModal.css';

// const DeleteSpotModal = ({ spotId, onSuccessfulDelete }) => {
//   const dispatch = useDispatch();
//   const { closeModal } = useModal();
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [error, setError] = useState('');

//   const handleDelete = async () => {
//     setIsDeleting(true);
//     setError('');
    
//     try {
//       await dispatch(deleteSpotThunk(spotId));
      
//       // Refresh the spots list after successful deletion
//       await dispatch(fetchUserSpots());
      
//       // Call the callback if provided
//       if (typeof onSuccessfulDelete === 'function') {
//         onSuccessfulDelete();
//       }
      
//       closeModal();
//     } catch (err) {
//       setError(err.message || 'Failed to delete spot. Please try again.');
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <div className="delete-spot-modal">
//       <h2>Confirm Delete</h2>
//       <p>Are you sure you want to remove this spot?</p>
      
//       {error && <p className="delete-error">{error}</p>}
      
//       <div className="delete-spot-buttons">
//         <button 
//           onClick={handleDelete} 
//           className="btn-red"
//           disabled={isDeleting}
//         >
//           {isDeleting ? 'Deleting...' : 'Yes (Delete Spot)'}
//         </button>
        
//         <button 
//           onClick={closeModal} 
//           className="btn-grey"
//           disabled={isDeleting}
//         >
//           No (Keep Spot)
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DeleteSpotModal;





// frontend/src/components/DeleteSpotModal/DeleteSpotModal.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteSpotThunk, fetchUserSpots } from '../../store/spots';
import './DeleteSpotModal.css';

const DeleteSpotModal = ({ spotId, onSuccessfulDelete }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setIsDeleting(true);
    setError('');
    try {
      await dispatch(deleteSpotThunk(spotId));
      // Refresh the spots list after successful deletion
      await dispatch(fetchUserSpots());
      // Call the callback if provided
      if (typeof onSuccessfulDelete === 'function') {
        onSuccessfulDelete();
      }
      closeModal();
    } catch (err) {
      setError(err.message || 'Failed to delete spot. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="delete-spot-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot?</p>
      {error && <p className="delete-error">{error}</p>}
      <div className="delete-review-modal-buttons">
        <button
          onClick={handleDelete}
          className="delete-review-confirm"
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Yes (Delete Spot)'}
        </button>
        <br></br>
        <button
          onClick={closeModal}
          className="delete-review-cancel"
          disabled={isDeleting}
        >
          No (Keep Spot)
        </button>
      </div>
    </div>
  );
};

export default DeleteSpotModal;
