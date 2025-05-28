import React from 'react'
import HeaderAdmin from '../../components/AdminHeader/HeaderAdmin'
import './style.css'
import Form from '../../components/Forms/Form'
import FooterAdmin from '../../components/AdminFooter/FooterAdim'
const HomePage = () => {
  return (
    <div className='home-container'>
    <HeaderAdmin />
    <div className='home-main'>
      <h1>Testes</h1>
        <Form/>
      </div>
      <FooterAdmin/>
      </div>
  )
}

export default HomePage
