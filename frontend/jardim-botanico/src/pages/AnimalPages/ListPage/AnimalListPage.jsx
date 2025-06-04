import React from 'react'
import HeaderAdmin from '../../../components/AdminHeader/HeaderAdmin.jsx'
import FooterAdmin from '../../../components/AdminFooter/FooterAdim.jsx'
import ListAnimals from '../../../components/ListAnimals/ListAnimals.jsx'
import { useParams } from 'react-router-dom'
import './style.css'
import Container from '../../../components/Container/Container.jsx'

const AnimalListPage = () => {
    const { id } = useParams();
    return (
        <div className='page-container'>
            <HeaderAdmin back={'/'}/>
            <div className="page-content">
                <Container children={<ListAnimals />} text='Animais'/>
               
                </div>
            <FooterAdmin/>
        </div>
    )
}

export default AnimalListPage
