import { useState } from 'react';
import HowWasYourStayModal from '../HowWasYourStayModal';

const SpotDetailsPage = ({ spot, onSubmitReview }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>{spot.title}</h1>
      <div className="spot-images">
        <img src={spot.previewImageUrl} alt="Preview" />
        {spot.imageUrls.map((url, idx) => (
          <img key={idx} src={url} alt={`Spot Image ${idx + 1}`} />
        ))}
      </div>

      <p>{spot.description}</p>

      <div>
        {/* Reserve Button (For now, it does nothing) */}
        <button>Reserve</button>

        {/* Button to open the review modal */}
        <button onClick={openModal}>Post Your Review</button>
      </div>

      {/* Modal to leave a review */}
      {isModalOpen && (
        <HowWasYourStayModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmitReview={onSubmitReview}
        />
      )}
    </div>
  );
};

export default SpotDetailsPage;
