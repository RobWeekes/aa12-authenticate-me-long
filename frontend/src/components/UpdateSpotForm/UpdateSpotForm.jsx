import { useState } from 'react';

const UpdateSpotForm = ({ spot, onUpdateSpot }) => {
  const [formData, setFormData] = useState({ ...spot });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateSpot(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Your Spot</h2>
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Spot Title"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <button type="submit">Update Spot</button>
      </div>
    </form>
  );
};

export default UpdateSpotForm;

