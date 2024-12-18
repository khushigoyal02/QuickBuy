import {React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate=useNavigate();

    const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/v1/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    };

  useEffect(()=>{ fetchProducts() },[])

  const deleteProduct = async(productId) => {
    try {
      await axios.delete(`/api/v1/products/${productId}`);
      //setProducts(products.filter(item => item._id != productId));
      //window.location.reload();
    } catch(error) {
      console.log('Error deleting product:', error);
    }
  }

  const handleAddProduct=async()=>{
    navigate('/add-product');
  }

  const editProduct=async(productId)=>{
    navigate(`/edit-product/${productId}`);
  }

  return (
    <div>
      <h1 className='text-center admin-heading'>ALL PRODUCTS</h1>
      <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Stock</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.stock}</td>
            <td>{product.price}</td>
            <td><EditIcon onClick={() => editProduct(product._id)} /> <DeleteIcon onClick={() => deleteProduct(product._id)} /></td>
          </tr>
        ))}
      </tbody>
      </table>
      <div className='but m-3'>
        <button onClick={handleAddProduct}>
          <AddIcon style={{ color: '#fff' }} /> <span className='fs-5 text-white'>Add</span>
        </button>
      </div>
    </div>
  )
}

export default Products
