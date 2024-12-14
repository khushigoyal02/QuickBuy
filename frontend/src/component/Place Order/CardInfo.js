import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const CardInfo = () => {
  // State to hold the form data
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardholderName: '',
    expirationDate: '',
    cvv: ''
  });

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const location = useLocation();
  const { formData } = location.state || {}; // Destructure shipping details

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };
  
  const isFormValid = () => {
    return cardData.cardNumber && cardData.cardholderName && cardData.expirationDate && cardData.cvv;
  }

  const handlePayNow = async () =>{
    if (isFormValid()){
      try{
        const response=await axios.post('/api/v1/place-order', {userId, formData});
      }catch(err){
        console.log(err);
      }
      navigate('/confirm');
    }else {
      alert('Please fill in all required fields.');
    }
  }

  return (
    <form className='m-3'>
      <h2>Card Information</h2>
      <div>
        <label>Card Number:</label>
        <input
          type="text"
          name="cardNumber"
          value={cardData.cardNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Cardholder Name:</label>
        <input
          type="text"
          name="cardholderName"
          value={cardData.cardholderName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Expiration Date (MM/YY):</label>
        <input
          type="text"
          name="expirationDate"
          value={cardData.expirationDate}
          onChange={handleChange}
          placeholder="MM/YY"
          required
        />
      </div>
      <div>
        <label>CVV:</label>
        <input
          type="text"
          name="cvv"
          value={cardData.cvv}
          onChange={handleChange}
          required
        />
      </div>
      <div className='but m-3'>
      <button onClick={handlePayNow}>Pay Now</button>
      </div>
    </form>
  );
};

export default CardInfo;
