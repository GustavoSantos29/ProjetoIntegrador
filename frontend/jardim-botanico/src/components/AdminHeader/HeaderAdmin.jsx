import React from 'react'
import './style.css'
import Arrow from '../../assets/svg/Arrow';
import logo from '../../assets/images/logo.png'
const HeaderAdmin = ({back= null}) => {
  const goBack = () => {
    if (back) {
      return <a href={back}><Arrow/></a>;
    } else {
      return;
    }
  }
  return (
    <div className='header'>
      <div className="left">
        {goBack(back)}
      </div>    
        <h2>Jardim botanico UFSM</h2>
      <img src={ logo}  className='header-img'/>
    </div>
  );
};

export default HeaderAdmin;
