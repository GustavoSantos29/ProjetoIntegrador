import React from 'react';
import HeaderAdmin from '../../../components/AdminHeader/HeaderAdmin.jsx';
import Container from '../../../components/Container/Container.jsx';
import FooterAdmin from '../../../components/AdminFooter/FooterAdim.jsx';
import EditUserForm from '../../../components/Forms/Edit/EditUserForm.jsx';
import { useParams } from 'react-router-dom';

const UserEditPage = () => {
    const { id } = useParams();
    return (
        <div className='page-container'>
            <HeaderAdmin back={'/users'} />
            <div className='page-content'>
                <Container children={<EditUserForm userId={id} />} text='Edição de usuário' />
            </div>
            <FooterAdmin />
        </div>
    );
};

export default UserEditPage;
