
const DeleteReviewModal = ({ isOpen, onClose, onDeleteReview }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <button onClick={onDeleteReview} className="btn-red">
        Yes (Delete Review)
      </button>
      <button onClick={onClose} className="btn-grey">
        No (Keep Review)
      </button>
    </div>
  );
};

export default DeleteReviewModal;