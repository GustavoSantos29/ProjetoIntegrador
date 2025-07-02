import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
const Container = ({ text, children }) => {
  const  navigate = useNavigate();
    return (
        <div className='container-outer'>
            <div className='container-tab'>{text}</div>

           
            <div className='container-inner'>{children}</div>
        </div>
    );
};

export default Container;
