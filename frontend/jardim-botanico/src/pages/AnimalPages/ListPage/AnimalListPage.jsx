import React from 'react'
import HeaderAdmin from '../../../components/AdminHeader/HeaderAdmin.jsx'
import FooterAdmin from '../../../components/AdminFooter/FooterAdim.jsx'
import ListAnimals from '../../../components/ListAnimals/ListAnimals.jsx'
import './style.css'
import Container from '../../../components/Container/Container.jsx'
import { useAuth } from '../../../context/AuthContext/AuthProvider.jsx'

const AnimalListPage = () => {

    
    return (
        <div className='page-container'>
            <HeaderAdmin/>
            <div className="page-content">
              
                <Container children={<ListAnimals />} text='Animais'/>
                </div>
            <FooterAdmin/>
        </div>
    )
}

export default AnimalListPage
