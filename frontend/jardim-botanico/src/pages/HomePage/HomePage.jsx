import React from 'react'
import HeaderAdmin from '../../components/AdminHeader/HeaderAdmin'
import '../AnimalPages/CreatePage/style.css'
import FooterAdmin from '../../components/AdminFooter/FooterAdim'
const HomePage = () => {
  return (
    <div className='page-container'>
    <HeaderAdmin />
    <div className='page-content'>
        <h1>Testes</h1>
        <a href="/create">Create</a>
        <hr />
        <a href="/list">List</a>
        <hr />
        <a href="/animal/72">View</a>
      </div>

      <FooterAdmin/>
      </div>
  )
}

export default HomePage
