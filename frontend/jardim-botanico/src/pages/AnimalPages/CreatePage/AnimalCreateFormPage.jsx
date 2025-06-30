import React from 'react'
import HeaderAdmin from '../../../components/AdminHeader/HeaderAdmin.jsx'
import './style.css'
import FooterAdmin from '../../../components/AdminFooter/FooterAdim.jsx'
import CreateAnimalForm from '../../../components/Forms/Create/CreateAnimalForm.jsx'
import Container from '../../../components/Container/Container.jsx'

const AnimalCreateFormPage = () => {
    return (
        <div className='page-container'>
             <HeaderAdmin back={'/animais'} />
            <div className="page-content">
                <Container children={<CreateAnimalForm/>} text='Criar animal'/>
            </div>
            <FooterAdmin/>
        </div>
    )
}

export default AnimalCreateFormPage
