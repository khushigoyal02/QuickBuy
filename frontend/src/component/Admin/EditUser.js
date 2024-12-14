import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
    const { userId } = useParams(); // Get the user ID from URL parameters
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/v1/user/${userId}`);
                setUserData(response.data); // Pre-fill form with fetched data
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            await axios.put(`/api/v1/user/${userId}`, userData);
            alert('User updated successfully');
            navigate('/all-users'); // Redirect after successful update
        } catch (error) {
            console.error('Error updating user:', error);
            alert('There was an error updating the user.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='m-5'>
            <h2>Edit User</h2>
            <label>
                Name:
                <input type="text" name="name" value={userData.name} onChange={handleChange} required disabled/>
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" value={userData.email} onChange={handleChange} required step="0.01" disabled/>
            </label>
            <br />
            <label>
                Role:
                <input type="text" name="role" value={userData.role} onChange={handleChange} required step="0.01" />
            </label>
            <br />
            <button type="submit">Update User</button>
        </form>
    );
};

export default EditUser;