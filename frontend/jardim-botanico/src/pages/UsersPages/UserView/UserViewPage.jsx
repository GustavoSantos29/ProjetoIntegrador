import React from 'react';
import HeaderAdmin from '../../../components/AdminHeader/HeaderAdmin.jsx';
import FooterAdmin from '../../../components/AdminFooter/FooterAdim.jsx';
import UserDisplay from '../../../components/UserDisplay/UserDisplay.jsx';
import { useParams } from 'react-router-dom';

const UserViewPage = () => {
    const { id } = useParams();
    return (
        <div className='page-container'>
            <HeaderAdmin back={'/users'} />
            <div className='page-content'>
                <div className='view-animal-main'>
                    <UserDisplay id={id} />
                </div>
            </div>
            <FooterAdmin />
        </div>
    );
};

export default UserViewPage;
