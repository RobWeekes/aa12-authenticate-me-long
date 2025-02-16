import { useState } from 'react';

const CreateSpotForm = () => {
  const [formData, setFormData] = useState({
    country: '',
    streetAddress: '',
    city: '',
    state: '',
    description: '',
    title: '',
    price: '',
    previewImageUrl: '',
    imageUrls: ['', '', '', '']
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.streetAddress) newErrors.streetAddress = "Street Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.title) newErrors.title = "Spot title is required";
    if (!formData.price) newErrors.price = "Price per night is required";
    if (!formData.previewImageUrl) newErrors.previewImageUrl = "Preview image URL is required";
    
    // Validate description length
    if (formData.description && formData.description.length < 30) {
      newErrors.description = "Description needs a minimum of 30 characters";
    }

    // Validate image URL format
    const imageUrlPattern = /\.(png|jpg|jpeg)$/i;
    if (formData.previewImageUrl && !imageUrlPattern.test(formData.previewImageUrl)) {
      newErrors.previewImageUrl = "Preview image URL must end in .png, .jpg, or .jpeg";
    }
    formData.imageUrls.forEach((url, idx) => {
      if (url && !imageUrlPattern.test(url)) {
        newErrors[`imageUrls[${idx}]`] = `Image URL ${idx + 1} must end in .png, .jpg, or .jpeg`;
      }
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Proceed with form submission logic (API call or state update)
      console.log('Form submitted successfully with data: ', formData);
      // Reset form and errors after successful submission
      setFormData({
        country: '',
        streetAddress: '',
        city: '',
        state: '',
        description: '',
        title: '',
        price: '',
        previewImageUrl: '',
        imageUrls: ['', '', '', '']
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Spot</h2>

      {/* Location inputs */}
      <div>
        <label>Where&apos;s your place located?</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
        />
        {errors.country && <p>{errors.country}</p>}
        
        <input
          type="text"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleChange}
          placeholder="Street Address"
        />
        {errors.streetAddress && <p>{errors.streetAddress}</p>}

        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
        />
        {errors.city && <p>{errors.city}</p>}

        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
        />
        {errors.state && <p>{errors.state}</p>}
      </div>

      {/* Description */}
      <div>
        <label>Describe your place to guests</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Please write at least 30 characters"
        />
        {errors.description && <p>{errors.description}</p>}
      </div>

      {/* Title */}
      <div>
        <label>Create a title for your spot</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Name of your spot"
        />
        {errors.title && <p>{errors.title}</p>}
      </div>

      {/* Price */}
      <div>
        <label>Set a base price for your spot</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price per night (USD)"
        />
        {errors.price && <p>{errors.price}</p>}
      </div>

      {/* Images */}
      <div>
        <label>Liven up your spot with photos</label>
        <input
          type="text"
          name="previewImageUrl"
          value={formData.previewImageUrl}
          onChange={handleChange}
          placeholder="Preview Image URL"
        />
        {errors.previewImageUrl && <p>{errors.previewImageUrl}</p>}
        
        {formData.imageUrls.map((url, idx) => (
          <div key={idx}>
            <input
              type="text"
              name={`imageUrls[${idx}]`}
              value={formData.imageUrls[idx]}
              onChange={handleChange}
              placeholder={`Image URL ${idx + 1}`}
            />
            {errors[`imageUrls[${idx}]`] && <p>{errors[`imageUrls[${idx}]`]}</p>}
          </div>
        ))}
      </div>

      <button type="submit">Create Spot</button>
    </form>
  );
};

export default CreateSpotForm;
