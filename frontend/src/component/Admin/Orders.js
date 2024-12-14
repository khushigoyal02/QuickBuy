import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/v1/all-orders'); 
                setOrders(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
        <h1 className='text-center admin-heading'>ALL ORDERS</h1>
      <table className='table'>
      <thead>
        <tr>
          <th>OrderId</th>
          <th>Items Quantity</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.totalQuantity}</td>
            <td>${order.amount}</td>
          </tr>
        ))}
      </tbody>
      </table>
        </div>
    );
};

export default Orders;