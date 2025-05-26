import React from 'react'
import './style.css'
import Arrow from '../../assets/svg/arrow';

const HeaderAdmin = ({back}) => {
  const goBack = () => {
    if (back) {
      return <a href="https://www.youtube.com/watch?v=jFd0-gCSzWg.com"><Arrow/></a>;
    } else {
      return;
    }
  }
  return (
    <div className='header'>
      <div className="left">
        {goBack(back)}
      </div>    
        <p>Jardim botanico UFSM</p>
      
    </div>
  );
};

export default HeaderAdmin;
