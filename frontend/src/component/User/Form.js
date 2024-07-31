import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null); // State for profile picture
    const navigate = useNavigate();
    const [action, setAction] = useState("Login");

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/v1/login', { email, password });
            const { userId, role } = response.data;
            // Store the userId in localStorage
            localStorage.setItem('userId', userId);
            localStorage.setItem('role', role);
            navigate('/');
            window.location.reload();
        } catch (err) {
            if (err.response && err.response.data.message === 'All fields must be filled') alert(err.response.data.message);
            if (err.response && err.response.data.message === 'Invalid Credentials') alert(err.response.data.message);
            console.error('Error logging in:', err);
        }
    };

    const handleSignup = async () => {
        const formData = new FormData(); // Create FormData object for file upload
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profilePic', profilePic); // Append profile picture


        try {
            const response = await axios.post('/api/v1/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { userId, role } = response.data;
            // Store the userId in localStorage
            localStorage.setItem('userId', userId);
            localStorage.setItem('role', role);
            navigate('/');
            window.location.reload();
        } catch (err) {
            if (err.response && err.response.data.message === 'All fields must be filled') alert(err.response.data.message);
            if (err.response && err.response.data.message === 'Email is not valid') alert(err.response.data.message);
            if (err.response && err.response.data.message === 'User already exists') alert(err.response.data.message);
            console.error('Error signing up:', err);
        }
    };

    const callonclick = () => {
        action === "Login" ? handleLogin() : handleSignup();
    };

    const clear = () => {
        setAction(action === "Login" ? "Register" : "Login");
        if (action === "Login") {
            setName("");
        }
        setEmail("");
        setPassword("");
        setProfilePic(null); // Clear profile picture
    };

    return (
        <div className='container'>
            <h2>{action}</h2>
            {action === "Login" ? null : (
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            )}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            
            {action === "Register" && (
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePic(e.target.files[0])} // Set the profile picture
                />
            )}

            <button onClick={callonclick}>{action}</button>

            {action === "Login" ? (
                <div className="text-center mt-3">
                    <span>Don't have an account?</span>
                    <button className="change text-primary m-0 p-0" onClick={clear}>Register</button>
                </div>
            ) : (
                <div className="text-center mt-3">
                    <span>Already have an account?</span>
                    <button className="change text-primary m-0 p-0" onClick={clear}>Login</button>
                </div>
            )}
        </div>
    );
};

export default Form;