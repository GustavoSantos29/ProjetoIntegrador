import React from 'react'
import './style.css'
import Arrow from '../../assets/svg/arrow';
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
      <img src={ logo} width="42" height="42" className='header-img'/>
    </div>
  );
};

export default HeaderAdmin;
