import React from 'react'
import HeaderAdmin from '../../../components/AdminHeader/HeaderAdmin.jsx'
import './style.css'
import FooterAdmin from '../../../components/AdminFooter/FooterAdim.jsx'
import AnimalDispay from '../../../components/AnimalDisplay/AnimalDisplay.jsx'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext/AuthProvider.jsx'

const AnimalViewPage = () => {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    return (
        <div className='page-container'>
                <HeaderAdmin back={isAuthenticated ? '/animais' : '/'}/>
            <div className="page-content">
            <div className='view-animal-main'>
                <AnimalDispay id={id}/>
            </div>
            </div>
                <FooterAdmin />
        </div>
    )
}

export default AnimalViewPage
