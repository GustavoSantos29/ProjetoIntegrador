import React from 'react'
import './style.css'
import logo from '../../assets/images/logo.png'
const FooterAdim = () => {
  return (
    <div className='footer'>
      <h2>Jardim botânico UFSM</h2>
      <img src={logo} className='footer-img'/>
    </div>
  )
}

export default FooterAdim
