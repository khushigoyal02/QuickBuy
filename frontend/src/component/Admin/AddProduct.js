import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProduct = () => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        imageurl: '',
        category: ''
    });
    const navigate=useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post('/api/v1/products', productData);
            alert(`Product added successfully: ${response.data.message}`);
            navigate('/all-products');
            // Reset form
            setProductData({
                name: '',
                description: '',
                price: '',
                rating: '',
                imageurl: '',
                stock: ''
            });
        } catch (error) {
            console.error('Error adding product:', error);
            alert('There was an error adding the product.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='m-5'>
            <h2>Add Product</h2>
            <label>
                Product Name:
                <input type="text" name="name" value={productData.name} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Description: <br/>
                <textarea name="description" value={productData.description} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Price:
                <input type="number" name="price" value={productData.price} onChange={handleChange} required step="0.01" />
            </label>
            <br />
            <label>
                Rating:
                <input type="number" name="rating" value={productData.rating} onChange={handleChange} required step="0.01" />
            </label>
            <br />
            <label>
                Image URL:
                <input type="url" name="imageurl" value={productData.imageurl} onChange={handleChange} />
            </label>
            <br />
            <label>
                Stock:
                <input type="number" name="stock" value={productData.stock} onChange={handleChange} required step="0.01" />
            </label>
            <br />
            <button type="submit">Create</button>
        </form>
    );
};

export default AddProduct;