import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShippingDetails = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = () => {
    return formData.address && formData.city && formData.state && formData.country && formData.phone;
  }

  const goToCardInfo = async () => {
    if (isFormValid()) {
      console.log('Form submitted:', formData);
      navigate('/card-info', { state: { formData } });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  return (
    <form className='m-3'>
      <h2>Shipping Details</h2>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className='but m-3'>
      <button onClick={goToCardInfo}>Proceed to Payment</button>
      </div>
    </form>
  );
};

export default ShippingDetails;
