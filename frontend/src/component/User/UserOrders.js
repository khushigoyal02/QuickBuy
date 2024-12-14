import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserOrders.css'

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem('userId'); // Get user ID from local storage

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/api/v1/user-orders/${userId}`);
                setOrders(response.data);
            } catch (err) {
                console.log(err);
            } 
        };

        fetchOrders();
    }, [userId]);

    const calculateTotalPrice = (price, quantity) => {
        return price * quantity 
    };

    return (
        <div>
            <h2>Your Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <li key={order._id} className='orders'>
                            {/*<h4>Shipping Details:</h4>*/}
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.productId} className='order-items'>
                                        <div className=''>
                                        <h5>Name: {item.name}</h5>
                                        <h6>Quantity: {item.quantity} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Price: ${calculateTotalPrice(item.price, item.quantity)} </h6>
                                        </div>
                                        <div>
                                        <img height="100px" width="100px" src={item.imageurl} alt={item.name} />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <b>Total Amount: ${order.amount}</b>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserOrders;
