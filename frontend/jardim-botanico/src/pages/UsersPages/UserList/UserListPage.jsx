import React from 'react'
import HeaderAdmin from '../../../components/AdminHeader/HeaderAdmin.jsx'
import FooterAdmin from '../../../components/AdminFooter/FooterAdim.jsx'
import Container from '../../../components/Container/Container.jsx'
import ListUsers from '../../../components/ListUsers/ListUsers.jsx'
import { useAuth } from '../../../context/AuthContext/AuthProvider.jsx'

const UserListPage = () => {

    
    return (
        <div className='page-container'>
            <HeaderAdmin/>
            <div className="page-content">
              
                <Container children={<ListUsers />} text='Usuários'/>
                </div>
            <FooterAdmin/>
        </div>
    )
}

export default UserListPage;
