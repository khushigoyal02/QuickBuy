import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import RatingStars from "react-rating-stars-component";
import "./ProductDetails.css";

const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    isHalf:true
}

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/v1/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const addToCart = async () => {
    if (!userId){
      alert('Please log in to add the cart.');
      navigate('/login');
    }
    
    try {
        const response = await axios.post('/api/v1/add-to-cart', {
          userId,
          productId: product._id,
          imageurl:product.imageurl,
          name: product.name,
          price: product.price,
          quantity: 1,
      });

      if (response.status===200){
        alert("Product added to cart successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchProduct() }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="productDetails row">
        <div className='col-md-6'>
            <img className='pimg' src={product.imageurl} alt={product.name} />
        </div>

        <div className='col-md-6'>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
              </div>
              <div className="detailsBlock-2">
                <RatingStars {...options} value={product.rating}/>
              </div>
              <div className="detailsBlock-3">
                <h2>{`$${product.price}`}</h2>
                <button disabled={product.stock === 0} onClick={addToCart}>Add to Cart</button>
              </div>
              <div>
                Status: 
              {product.stock > 0 ? (
                <span className='green fw-bold'> In Stock</span>
              ) : (
                <span className='red fw-bold'> Out of Stock</span>
              )}
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
          </div>
    </div>
  );
};

export default ProductDetails;