import React from 'react'
import HeaderAdmin from '../../../components/AdminHeader/HeaderAdmin.jsx'

import FooterAdmin from '../../../components/AdminFooter/FooterAdim.jsx'
import EditAnimalForm from '../../../components/Forms/Edit/EditAnimalForm.jsx'
import { useParams } from 'react-router-dom'

const AnimalEditPage = () => {
    const { id } = useParams();
    console.log("", id)
    return (
        <div className='page-container'>
             <HeaderAdmin back={'/'} />
            <div className="page-content">
            <div className='create-main'>
                <div className='create-main-content'>
                        <h1>Formulário de edição</h1>
                        <EditAnimalForm animalId={id}/> 
                    </div>
                </div>
            </div>
            <FooterAdmin/>
        </div>
    )
}

export default AnimalEditPage
