// // frontend/src/components/DeleteReviewModal/DeleteReviewModal.jsx
// const DeleteReviewModal = ({ isOpen, onClose, onDeleteReview }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal">
//       <h2>Confirm Delete</h2>
//       <p>Are you sure you want to delete this review?</p>
//       <button onClick={onDeleteReview} className="btn-red">
//         Yes (Delete Review)
//       </button>
//       <button onClick={onClose} className="btn-grey">
//         No (Keep Review)
//       </button>
//     </div>
//   );
// };

// export default DeleteReviewModal;






// frontend/src/components/DeleteReviewModal/DeleteReviewModal.jsx
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import './DeleteReviewModal.css';

function DeleteReviewModal({ reviewId, onClose }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteReview(reviewId));
      onClose();
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  return (
    <div className="delete-review-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <div className="delete-review-modal-buttons">
        <button
          className="delete-review-confirm"
          onClick={handleDelete}
        >
          Yes (Delete Review)
        </button>
        <br></br>
        <button
          className="delete-review-cancel"
          onClick={onClose}
        >
          No (Keep Review)
        </button>
      </div>
    </div>
  );
}

export default DeleteReviewModal;
