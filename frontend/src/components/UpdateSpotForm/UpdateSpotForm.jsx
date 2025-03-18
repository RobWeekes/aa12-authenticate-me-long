// frontend/src/components/UpdateSpotForm/UpdateSpotForm.jsx
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSpotById, updateSpot } from '../../store/spots';

// function UpdateSpotForm() {
//   const { spotId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const spot = useSelector(state => state.spots.singleSpot);
//   const [isLoading, setIsLoading] = useState(true);
//   const [errors, setErrors] = useState({});

//   const [formData, setFormData] = useState({
//     country: '',
//     address: '',
//     city: '',
//     state: '',
//     description: '',
//     name: '',
//     price: '',
//     previewImage: '',
//     images: ['', '', '', ''],
//   });

//   console.log('Current spot data:', spot);
//   console.log('Form data being submitted:', formData);


//   useEffect(() => {
//     const loadSpot = async () => {
//       try {
//         await dispatch(fetchSpotById(spotId));
//       } catch (error) {
//         console.error('Failed to load spot:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadSpot();
//   }, [dispatch, spotId]);

//   useEffect(() => {
//     if (spot) {
//       // Initialize form with spot data
//       setFormData({
//         country: spot.country || '',
//         address: spot.address || '',
//         city: spot.city || '',
//         state: spot.state || '',
//         description: spot.description || '',
//         name: spot.name || '',
//         price: spot.price || '',
//         // Don't populate images for update form since we don't allow updating images
//         previewImage: '',
//         images: ['', '', '', ''],
//       });
//     }
//   }, [spot]);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.country) newErrors.country = 'Country is required';
//     if (!formData.address) newErrors.address = 'Street address is required';
//     if (!formData.city) newErrors.city = 'City is required';
//     if (!formData.state) newErrors.state = 'State is required';
//     if (!formData.description || formData.description.length < 30) {
//       newErrors.description = 'Description needs 30 or more characters';
//     }
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.price) newErrors.price = 'Price is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     try {
//       const updatedSpotData = {
//         id: spotId,
//         country: formData.country,
//         address: formData.address,
//         city: formData.city,
//         state: formData.state,
//         description: formData.description,
//         name: formData.name,
//         price: parseFloat(formData.price),
//       };

//       await dispatch(updateSpot(updatedSpotData));
//       navigate(`/spots/${spotId}`);
//     } catch (error) {
//       console.error('Error updating spot:', error);
//       if (error.errors) {
//         setErrors(error.errors);
//       }
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!spot) {
//     return <div>Spot not found</div>;
//   }

//   return (
//     <form onSubmit={handleSubmit} className="spot-form">
//       <h1>Update your Spot</h1>

//       <section>
//         <h3>Where&apos;s your place located?</h3>
//         <p>Guests will only get your exact address once they booked a reservation.</p>

//         <div className="form-group">
//           <label>Country</label>
//           {errors.country && <span className="error">{errors.country}</span>}
//           <input
//             type="text"
//             value={formData.country}
//             onChange={(e) => setFormData({ ...formData, country: e.target.value })}
//             placeholder="Country"
//           />
//         </div>

//         <div className="form-group">
//           <label>Street Address</label>
//           {errors.address && <span className="error">{errors.address}</span>}
//           <input
//             type="text"
//             value={formData.address}
//             onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//             placeholder="Address"
//           />
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label>City</label>
//             {errors.city && <span className="error">{errors.city}</span>}
//             <input
//               type="text"
//               value={formData.city}
//               onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//               placeholder="City"
//             />
//           </div>

//           <div className="form-group">
//             <label>State</label>
//             {errors.state && <span className="error">{errors.state}</span>}
//             <input
//               type="text"
//               value={formData.state}
//               onChange={(e) => setFormData({ ...formData, state: e.target.value })}
//               placeholder="STATE"
//             />
//           </div>
//         </div>
//       </section>

//       <section>
//         <h3>Describe your place to guests</h3>
//         <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>

//         <div className="form-group">
//           {errors.description && <span className="error">{errors.description}</span>}
//           <textarea
//             value={formData.description}
//             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//             placeholder="Please write at least 30 characters"
//             rows="5"
//           />
//         </div>
//       </section>

//       <section>
//         <h3>Create a title for your spot</h3>
//         <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>

//         <div className="form-group">
//           {errors.name && <span className="error">{errors.name}</span>}
//           <input
//             type="text"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             placeholder="Name of your spot"
//           />
//         </div>
//       </section>

//       <section>
//         <h3>Set a base price for your spot</h3>
//         <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>

//         <div className="form-group price-group">
//           {errors.price && <span className="error">{errors.price}</span>}
//           <div className="price-input">
//             <span>$</span>
//             <input
//               type="number"
//               value={formData.price}
//               onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//               placeholder="Price per night (USD)"
//               min="0"
//               step="0.01"
//             />
//           </div>
//         </div>
//       </section>

//       <button type="submit" className="submit-button">Create Spot</button>
//     </form>
//   );
// }

// export default UpdateSpotForm;






// frontend/src/components/UpdateSpotForm/UpdateSpotForm.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotById, updateSpotThunk } from '../../store/spots';
import './UpdateSpotForm.css';

function UpdateSpotForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spotId } = useParams();
  
  // Get the spot from Redux store
  const spot = useSelector(state => state.spots.singleSpot);
  const loading = useSelector(state => state.spots.loading);
  const error = useSelector(state => state.spots.error);
  
  // Form state
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    lat: '',
    lng: '',
    name: '',
    description: '',
    price: ''
  });
  
  // Validation errors
  const [validationErrors, setValidationErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  // Load spot data when component mounts
  useEffect(() => {
    const loadSpot = async () => {
      try {
        const loadedSpot = await dispatch(fetchSpotById(spotId));
        if (loadedSpot) {
          // Initialize form with spot data
          setFormData({
            address: loadedSpot.address || '',
            city: loadedSpot.city || '',
            state: loadedSpot.state || '',
            country: loadedSpot.country || '',
            lat: loadedSpot.lat || '',
            lng: loadedSpot.lng || '',
            name: loadedSpot.name || '',
            description: loadedSpot.description || '',
            price: loadedSpot.price || ''
          });
        }
      } catch (err) {
        console.error('Error loading spot:', err);
      }
    };
    
    loadSpot();
  }, [dispatch, spotId]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Validate form data
  const validateForm = () => {
    const errors = {};
    
    if (!formData.address) errors.address = 'Street address is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.name) errors.name = 'Name is required';
    if (formData.name && formData.name.length > 50) errors.name = 'Name must be less than 50 characters';
    if (!formData.description) errors.description = 'Description is required';
    if (formData.description && formData.description.length < 30) {
      errors.description = 'Description needs 30 or more characters';
    }
    if (!formData.price) errors.price = 'Price is required';
    if (formData.price && (isNaN(formData.price) || Number(formData.price) <= 0)) {
      errors.price = 'Price must be a positive number';
    }
    
    return errors;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Validate form
    const errors = validateForm();
    setValidationErrors(errors);
    
    // If there are validation errors, don't submit
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    // Prepare data for submission
    const spotData = {
      ...formData,
      lat: formData.lat || 0,
      lng: formData.lng || 0,
      price: Number(formData.price)
    };
    
    try {
      console.log('Submitting updated spot data:', spotData);
      const updatedSpot = await dispatch(updateSpotThunk(spotId, spotData));
      
      if (updatedSpot) {
        console.log('Spot updated successfully, navigating to spot details');
        navigate(`/spots/${spotId}`);
      }
    } catch (err) {
      console.error('Error updating spot:', err);
      // If there's a specific error message from the server, show it
      if (err.errors) {
        setValidationErrors(err.errors);
      }
    }
  };
  
  // Show loading state
  if (loading && !spot) {
    return <div className="loading">Loading spot details...</div>;
  }
  
  // Show error if spot couldn't be loaded
  if (error && !spot) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={() => navigate('/spots/current')}>Back to My Spots</button>
      </div>
    );
  }
  
  console.log('Current spot data:', spot);
  console.log('Form data being submitted:', formData);
  
  return (
    <div className="edit-spot-container">
      <h1>Update your Spot</h1>
      
      <form onSubmit={handleSubmit} className="spot-form">
        <section className="form-section">
          <h2>Where&apos;s your place located?</h2>
          <p>Guests will only get your exact address once they&apos;ve booked a reservation.</p>
          
          <div className="form-group">
            <label htmlFor="address">Street Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className={submitted && validationErrors.address ? 'error' : ''}
            />
            {submitted && validationErrors.address && (
              <p className="error-message">{validationErrors.address}</p>
            )}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className={submitted && validationErrors.city ? 'error' : ''}
              />
              {submitted && validationErrors.city && (
                <p className="error-message">{validationErrors.city}</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className={submitted && validationErrors.state ? 'error' : ''}
              />
              {submitted && validationErrors.state && (
                <p className="error-message">{validationErrors.state}</p>
              )}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className={submitted && validationErrors.country ? 'error' : ''}
              />
              {submitted && validationErrors.country && (
                <p className="error-message">{validationErrors.country}</p>
              )}
            </div>
          </div>
        </section>
        
        <section className="form-section">
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          
          <div className="form-group">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Please write at least 30 characters"
              rows="5"
              className={submitted && validationErrors.description ? 'error' : ''}
            ></textarea>
            {submitted && validationErrors.description && (
              <p className="error-message">{validationErrors.description}</p>
            )}
          </div>
        </section>
        
        <section className="form-section">
          <h2>Create a title for your spot</h2>
          <p>Catch guests&apos attention with a spot title that highlights what makes your place special.</p>
          
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name of your spot"
              className={submitted && validationErrors.name ? 'error' : ''}
            />
            {submitted && validationErrors.name && (
              <p className="error-message">{validationErrors.name}</p>
            )}
          </div>
        </section>
        
        <section className="form-section">
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          
          <div className="form-group price-group">
            <label htmlFor="price">$ </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price per night (USD)"
              className={submitted && validationErrors.price ? 'error' : ''}
            />
            {submitted && validationErrors.price && (
              <p className="error-message">{validationErrors.price}</p>
            )}
          </div>
        </section>
        
        <div className="form-actions">
          {/* <button type="submit" className="submit-button">Update Spot</button> */}
          <button type="submit" className="create-spot-button">Update Spot</button>
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/spots/current')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateSpotForm;

