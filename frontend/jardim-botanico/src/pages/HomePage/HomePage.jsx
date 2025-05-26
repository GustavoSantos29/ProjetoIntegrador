import React from 'react'
import HeaderAdmin from '../../components/AdminHeader/HeaderAdmin'
import ImageInput from '../../components/Inputs/ImageInput/ImageInput'
import TextInput from "../../components/Inputs/TextInput/TextInput"
import './style.css'
import TextArea from '../../components/Inputs/TextArea/TextArea'
import ImageDisplay from '../../components/ImageDisplay/ImageDisplay'
import Dropdowns from '../../components/Dropdowns/Dropdown'
const HomePage = () => {
  return (
    <div className="home-container">
      <HeaderAdmin />
      <h1>Testes</h1>
      <div className="input-section">
          <ImageInput/>
          <TextInput label='Nome' required={true}/>
          <TextInput label='Nome' required={true}/>
          <TextInput label='Nome' required={true}/>
          <TextInput label='Nome' required={true}/>
        <TextInput label='Nome' required={true} />
        <div className='sub-input'>
          <TextInput label='Nome' required={true} size='small'/>
          <TextInput label='Nome' required={true} size='small'/>
          <TextInput label='Nome' required={true} size='small'/>
          <TextInput label='Nome' required={true} size='small'/>
          <TextInput label='Nome' required={true} size='small'/>
          <TextInput label='Nome' required={true} size='small'/>
          <TextInput label='Nome' required={true} size='small'/>
          <TextInput label='Nome' required={true} size='small'/>
        
          </div>
          <TextInput label='Nome' required={true}/>
        <TextInput label='Nome' required={true} />
        <TextArea label='Amigo' required={true} />
        <Dropdowns name='Artigos'/>
        <ImageDisplay image={'./images/onca.jpg'} name='Onça pintada'/>
        <ImageDisplay image={'./images/tralalero.jpg'} name='Tralalero tralala' />
        </div>
    </div>
  )
}

export default HomePage
