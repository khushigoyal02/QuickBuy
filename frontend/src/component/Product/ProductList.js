import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import './ProductList.css';
import ReactStars from "react-rating-stars-component";

const options={
  edit:false,
  color:"rgba(20,20,20,0.1)",
  isHalf:true
}

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/v1/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => { fetchProducts() }, []);

  return (
    <div>
      <h1 className="productsHeading">Products</h1>
      <div className="products">
        {products.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id} className="productCard">
            <img src={product.imageurl} alt={product.name} />
            <h3>{product.name}</h3>
            <ReactStars {...options} value={product.rating}/>
            <span>{`$${product.price}`}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
