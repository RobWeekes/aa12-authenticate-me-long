// // frontend/src/components/CreateSpotForm/CreateSpotForm.jsx
// import { useState } from 'react';

// function CreateSpotForm() {
//   const [formData, setFormData] = useState({
//     country: '',
//     streetAddress: '',
//     city: '',
//     state: '',
//     description: '',
//     name: '',
//     price: '',
//     previewImage: '',
//     images: ['', '', '', ''],
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Dispatch action to create a new spot
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Create a New Spot</h1>
//       <h3>Where&apos;s your place located?</h3>
//       <input type="text" placeholder="Country" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} required />
//       <input type="text" placeholder="Address" value={formData.streetAddress} onChange={(e) => setFormData({...formData, streetAddress: e.target.value})} required />
//       <input type="text" placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required />
//       <input type="text" placeholder="STATE" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} required />
      
//       <h3>Describe your place to guests</h3>
//       <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />

//       <h3>Create a title for your spot</h3>
//       <input type="text" placeholder="Name of your spot" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />

//       <h3>Set a base price for your spot</h3>
//       <input type="number" placeholder="Price per night (USD)" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />

//       <h3>Liven up your spot with photos</h3>
//       <input type="url" placeholder="Preview Image URL" value={formData.previewImage} onChange={(e) => setFormData({...formData, previewImage: e.target.value})} required />
//       {formData.images.map((image, index) => (
//         <input key={index} type="url" placeholder="Image URL" value={image} onChange={(e) => {
//           const newImages = [...formData.images];
//           newImages[index] = e.target.value;
//           setFormData({...formData, images: newImages});
//         }} />
//       ))}

//       <button type="submit">Create Spot</button>
//     </form>
//   );
// }

// export default CreateSpotForm;





// frontend/src/components/CreateSpotForm/CreateSpotForm.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSpot } from '../../store/spots';
import './CreateSpotForm.css';

function CreateSpotForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    country: '',
    address: '',
    city: '',
    state: '',
    description: '',
    name: '',
    price: '',
    previewImage: '',
    images: ['', '', '', ''],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    const validationErrors = {};
    if (!formData.country) validationErrors.country = "Country is required";
    if (!formData.address) validationErrors.address = "Address is required";
    if (!formData.city) validationErrors.city = "City is required";
    if (!formData.state) validationErrors.state = "State is required";
    if (!formData.description) validationErrors.description = "Description is required";
    if (formData.description.length < 30) validationErrors.description = "Description needs 30 or more characters";
    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.price) validationErrors.price = "Price is required";
    if (!formData.previewImage) validationErrors.previewImage = "Preview image is required";
    
    // Check if preview image URL is valid
    if (formData.previewImage && !formData.previewImage.match(/\.(jpeg|jpg|png)$/i)) {
      validationErrors.previewImage = "Image URL must end in .png, .jpg, or .jpeg";
    }
    
    // Check if other image URLs are valid (if provided)
    formData.images.forEach((img, idx) => {
      if (img && !img.match(/\.(jpeg|jpg|png)$/i)) {
        validationErrors[`image${idx}`] = "Image URL must end in .png, .jpg, or .jpeg";
      }
    });
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Prepare spot data for API
    const spotData = {
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      lat: 37.7645358,
      lng: -122.4730327,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price)
    };
    
    // Prepare images data
    const images = [
      { url: formData.previewImage, preview: true }
    ];
    
    // Add additional images if they exist
    formData.images.forEach(img => {
      if (img) {
        images.push({ url: img, preview: false });
      }
    });
    
    try {
      // Dispatch the action to create a spot
      const newSpot = await dispatch(createSpot(spotData, images));
      
      // Navigate to the new spot's page
      if (newSpot && newSpot.id) {
        navigate(`/spots/${newSpot.id}`);
      }
    } catch (error) {
      console.error("Error creating spot:", error);
      setErrors({ submit: error.message || "Failed to create spot" });
    }
  };

  return (
    <div className="create-spot-container">
      <form onSubmit={handleSubmit}>
        <h1>Create a New Spot</h1>
        
        <div className="section">
          <h2>Where&apos;s your place located?</h2>
          <p>Guests will only get your exact address once they&apos;ve booked a reservation.</p>
          
          <div className="form-group">
            <label>Country</label>
            <input 
              type="text" 
              value={formData.country} 
              onChange={(e) => setFormData({...formData, country: e.target.value})} 
              placeholder="Country"
            />
            {errors.country && <div className="error">{errors.country}</div>}
          </div>
          
          <div className="form-group">
            <label>Street Address</label>
            <input 
              type="text" 
              value={formData.address} 
              onChange={(e) => setFormData({...formData, address: e.target.value})} 
              placeholder="Address"
            />
            {errors.address && <div className="error">{errors.address}</div>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input 
                type="text" 
                value={formData.city} 
                onChange={(e) => setFormData({...formData, city: e.target.value})} 
                placeholder="City"
              />
              {errors.city && <div className="error">{errors.city}</div>}
            </div>
            
            <div className="form-group">
              <label>State</label>
              <input 
                type="text" 
                value={formData.state} 
                onChange={(e) => setFormData({...formData, state: e.target.value})} 
                placeholder="STATE"
              />
              {errors.state && <div className="error">{errors.state}</div>}
            </div>
          </div>
        </div>
        
        <div className="section">
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          
          <div className="form-group">
            <textarea 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              placeholder="Please write at least 30 characters"
              rows="5"
            />
            {errors.description && <div className="error">{errors.description}</div>}
          </div>
        </div>
        
        <div className="section">
          <h2>Create a title for your spot</h2>
          <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
          
          <div className="form-group">
            <input 
              type="text" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              placeholder="Name of your spot"
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
        </div>
        
        <div className="section">
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          
          <div className="form-group price-group">
            <span className="price-symbol">$</span>
            <input 
              type="number" 
              value={formData.price} 
              onChange={(e) => setFormData({...formData, price: e.target.value})} 
              placeholder="Price per night (USD)"
              min="0"
              step="0.01"
            />
            {errors.price && <div className="error">{errors.price}</div>}
          </div>
        </div>
        
        <div className="section">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          
          <div className="form-group">
            <label>Preview Image</label>
            <input 
              type="url" 
              value={formData.previewImage} 
              onChange={(e) => setFormData({...formData, previewImage: e.target.value})} 
              placeholder="Preview Image URL (must end in .png, .jpg, or .jpeg)"
            />
            {errors.previewImage && <div className="error">{errors.previewImage}</div>}
          </div>
          
          {formData.images.map((image, index) => (
            <div className="form-group" key={index}>
              <label>Image {index + 1}</label>
              <input 
                type="url" 
                value={image} 
                onChange={(e) => {
                  const newImages = [...formData.images];
                  newImages[index] = e.target.value;
                  setFormData({...formData, images: newImages});
                }} 
                placeholder="Image URL (must end in .png, .jpg, or .jpeg)"
              />
              {errors[`image${index}`] && <div className="error">{errors[`image${index}`]}</div>}
            </div>
          ))}
        </div>
        
        {errors.submit && <div className="submit-error">{errors.submit}</div>}
        
        <div className="form-actions">
          <button type="submit" className="create-spot-button">Create Spot</button>
        </div>
      </form>
    </div>
  );
}

export default CreateSpotForm;
