import React from 'react';
import './style.css';
import Arrow from '../../assets/svg/Arrow';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const HeaderAdmin = ({ back = null }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (back) {
      return (
        <button onClick={() => navigate(back)} className="back-button">
          <Arrow />
        </button>
      );
    } else {
      return null;
    }
  };

  return (
    <div className='header'>
      <div className="left">
        {goBack()}
      </div>
      <h2>Jardim botânico UFSM</h2>
      <img src={logo} className='header-img' />
    </div>
  );
};

export default HeaderAdmin;