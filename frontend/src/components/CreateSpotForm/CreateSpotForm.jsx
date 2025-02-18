import { useState } from 'react';

function CreateSpotForm() {
  const [formData, setFormData] = useState({
    country: '',
    streetAddress: '',
    city: '',
    state: '',
    description: '',
    name: '',
    price: '',
    previewImage: '',
    images: ['', '', '', ''],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to create a new spot
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a New Spot</h1>
      <h3>Where&apos;s your place located?</h3>
      <input type="text" placeholder="Country" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} required />
      <input type="text" placeholder="Street Address" value={formData.streetAddress} onChange={(e) => setFormData({...formData, streetAddress: e.target.value})} required />
      <input type="text" placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required />
      <input type="text" placeholder="State" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} required />
      
      <h3>Describe your place to guests</h3>
      <textarea placeholder="Please write at least 30 characters" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />

      <h3>Create a title for your spot</h3>
      <input type="text" placeholder="Name of your spot" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />

      <h3>Set a base price for your spot</h3>
      <input type="number" placeholder="Price per night (USD)" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />

      <h3>Liven up your spot with photos</h3>
      <input type="url" placeholder="Preview Image URL" value={formData.previewImage} onChange={(e) => setFormData({...formData, previewImage: e.target.value})} required />
      {formData.images.map((image, index) => (
        <input key={index} type="url" placeholder="Image URL" value={image} onChange={(e) => {
          const newImages = [...formData.images];
          newImages[index] = e.target.value;
          setFormData({...formData, images: newImages});
        }} />
      ))}

      <button type="submit">Create Spot</button>
    </form>
  );
}

export default CreateSpotForm;