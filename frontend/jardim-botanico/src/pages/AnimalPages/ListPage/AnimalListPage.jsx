import React from 'react'
import HeaderAdmin from '../../../components/AdminHeader/HeaderAdmin.jsx'
import FooterAdmin from '../../../components/AdminFooter/FooterAdim.jsx'
import ListAnimals from '../../../components/ListAnimals/ListAnimals.jsx'
import { useParams } from 'react-router-dom'
import './style.css'

const AnimalListPage = () => {
    const { id } = useParams();
    return (
        <div className='page-container'>
            <HeaderAdmin back={'/'}/>
               <div className="page-content">
            <div className='list-main'>
                <ListAnimals />
                </div>
                </div>
            <FooterAdmin/>
        </div>
    )
}

export default AnimalListPage
