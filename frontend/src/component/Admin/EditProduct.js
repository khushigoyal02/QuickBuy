import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
    const { id } = useParams(); // Get the product ID from URL parameters
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        rating: '',
        imageurl: '',
        stock: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/v1/products/${id}`);
                setProductData(response.data); // Pre-fill form with fetched data
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            await axios.put(`/api/v1/products/${id}`, productData);
            alert('Product updated successfully');
            navigate('/all-products'); // Redirect after successful update
        } catch (error) {
            console.error('Error updating product:', error);
            alert('There was an error updating the product.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='m-5'>
            <h2>Edit Product</h2>
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
                <input type="url" name="imageurl" value={productData.imageurl} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Stock:
                <input type="number" name="stock" value={productData.stock} onChange={handleChange} required step="0.01" />
            </label>
            <br />
            <button type="submit">Update Product</button>
        </form>
    );
};

export default EditProduct;