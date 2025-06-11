import React from 'react'
import HeaderAdmin from '../../../components/AdminHeader/HeaderAdmin.jsx'
import Container from '../../../components/Container/Container.jsx'
import FooterAdmin from '../../../components/AdminFooter/FooterAdim.jsx'
import EditAnimalForm from '../../../components/Forms/Edit/EditAnimalForm.jsx'
import { useParams } from 'react-router-dom'

const AnimalEditPage = () => {
    const { id } = useParams();
    return (
        <div className='page-container'>
             <HeaderAdmin back={'/'} />
            <div className="page-content">
                        <Container children={<EditAnimalForm animalId={id} />} text='Edição de animal' /> 
            </div>
            <FooterAdmin/>
        </div>
    )
}

export default AnimalEditPage
