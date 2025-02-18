
const DeleteSpotModal = ({ isOpen, onClose, onDeleteSpot }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot?</p>
      <button onClick={onDeleteSpot} className="btn-red">
        Yes (Delete Spot)
      </button>
      <button onClick={onClose} className="btn-grey">
        No (Keep Spot)
      </button>
    </div>
  );
};

export default DeleteSpotModal;