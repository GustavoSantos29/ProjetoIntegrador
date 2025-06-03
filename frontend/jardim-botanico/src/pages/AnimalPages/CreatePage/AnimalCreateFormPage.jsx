import React from 'react'
import HeaderAdmin from '../../../components/AdminHeader/HeaderAdmin.jsx'
import './style.css'
import Form from '../../../components/Forms/Form.jsx'
import FooterAdmin from '../../../components/AdminFooter/FooterAdim.jsx'

const AnimalCreateFormPage = () => {
    return (
        <div className='page-container'>
             <HeaderAdmin back={'/'} />
            <div className="page-content">
            <div className='create-main'>
                <div className='create-main-content'>
                <h1>Formulário de criação</h1>
                <Form/>
                    </div>
                </div>
            </div>
            <FooterAdmin/>
        </div>
    )
}

export default AnimalCreateFormPage
