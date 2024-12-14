import {React, useEffect, useState} from 'react';
import PeopleIcon from '@material-ui/icons/People';
import ProductIcon from '@material-ui/icons/LocalMall';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import ListAltIcon from '@material-ui/icons/ListAlt';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { Link } from 'react-router-dom';

const Panel = () => {
  const [isAdmin, setIsAdmin]=useState(false);
  const role=localStorage.getItem('role');
  
  useEffect(()=>{
    if (role=='Admin') setIsAdmin(true);
  }, [])

    return (
      <div>
        <ul style={{
            listStyle: 'none',
            marginTop: '10px',
        }}>
          <li className='my-1'><Link to="/cart-items"><ShoppingCartIcon fontSize="medium" /></Link></li>
          <li className='my-1'><Link to="/profile"><PersonIcon fontSize="medium" /></Link></li>
          <li className='my-1'><Link to="/my-orders"><ListAltIcon fontSize="medium" /></Link></li>
          {isAdmin ? (
            <>
            <li className='my-1'><Link to="/all-products"><ProductIcon fontSize="medium" /></Link></li>
            <li className='my-1'><Link to="/users"><PeopleIcon fontSize="medium" /></Link></li>
            <li className='my-1'><Link to="/all-orders"><NoteAddIcon fontSize="medium" /></Link></li>
            </>
          ): (
            <></>
          )}
        </ul>
      </div>
    );
  };

export default Panel
