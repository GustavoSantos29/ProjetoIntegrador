import React from 'react'
import HeaderAdmin from '../../components/AdminHeader/HeaderAdmin.jsx'

import FooterAdmin from '../../components/AdminFooter/FooterAdim.jsx'

import LoginForm from '../../components/Forms/Login/LoginForm.jsx'

const LoginPage = () => {
    return (
        <div className='page-container'>
                <HeaderAdmin />
        <div className="page-content">
               <LoginForm/>
            </div>
                <FooterAdmin />
        </div>
    )
}

export default LoginPage
