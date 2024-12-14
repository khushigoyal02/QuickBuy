import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('userId');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => { fetchCartItems() }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`api/v1/cart/${userId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleUpdateQuantity = async (productId) => {
    try{
      await axios.put(`/api/v1/cart/${userId}/${productId}`, { quantity });
      window.location.reload();
    }catch(error){
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`/api/v1/cart/${userId}/${productId}`);
      window.location.reload();
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const calculateTotalPrice = (price, quantity) => {
    return price * quantity 
  };

  const handlePlaceOrder = async () => {
    navigate('/shipping');
  }

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className='empty'>
          <RemoveShoppingCartIcon style={{ color: '#eb4034' }} className='fs-1'/>
          <h1>Your cart is currently empty</h1>
        </div>
      ) : (
        <div>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id} className='cartList row'>
              <div className='col-md-6'>
              <img src={item.imageurl} alt={item.name} />
              <h4 className='fw-light detailsBlock-1 pt-1 pb-0 fs-5'>{item.name}</h4>
              <span className='fw-bold'>Price: ${calculateTotalPrice(item.price, item.quantity)}</span> <br/>
              <button onClick={() => removeFromCart(item.productId)}>Remove</button>
              </div>

              <div className='mt-3 col-md-6'>
              <p className="fs-5 fw-bold">Quantity: {item.quantity}</p>
      <select value={quantity} onChange={handleQuantityChange} >
        {[...Array(10)].map((_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <button className="mx-3" onClick={() => handleUpdateQuantity(item.productId)}>Update Quantity</button>
      </div> 
            </li>
          ))}
        </ul>
        <div className='but mb-3'>
        <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
        </div>
      )}
    </div>
  );
};

export default Cart;