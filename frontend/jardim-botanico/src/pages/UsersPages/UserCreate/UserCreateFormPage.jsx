import React from 'react';
import HeaderAdmin from '../../../components/AdminHeader/HeaderAdmin.jsx';
import './style.css';
import FooterAdmin from '../../../components/AdminFooter/FooterAdim.jsx';
import CreateUserForm from '../../../components/Forms/Create/CreateUserForm.jsx';
import Container from '../../../components/Container/Container.jsx';

const AnimalCreateFormPage = () => {
    return (
        <div className='page-container'>
            <HeaderAdmin back={'/'} />
            <div className='page-content'>
                <Container children={<CreateUserForm />} text='Criar usuário' />
            </div>
            <FooterAdmin />
        </div>
    );
};

export default AnimalCreateFormPage;
