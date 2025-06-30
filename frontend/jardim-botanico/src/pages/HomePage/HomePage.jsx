import React from 'react';
import HeaderAdmin from '../../components/AdminHeader/HeaderAdmin';
import '../AnimalPages/CreatePage/style.css';
import FooterAdmin from '../../components/AdminFooter/FooterAdim';
const HomePage = () => {
    return (
        <div className='page-container'>
            <HeaderAdmin />
            <div className='page-content'>
                <h1>Testes</h1>
                <a href='animal/create'>Create</a>
                <hr />
                <a href='/animais'>List</a>
                <hr />
            </div>

            <FooterAdmin />
        </div>
    );
};

export default HomePage;
