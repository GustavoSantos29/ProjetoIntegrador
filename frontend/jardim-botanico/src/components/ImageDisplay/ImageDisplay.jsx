import React from 'react'
import './style.css'

/**
 * @param image
 * @param name
 */


const ImageDisplay = ({ image, name }) => {

  function formatName(name) {
    if (name.length > 30) {
      const formatedName = name.substring(0, 30);
      return formatedName
    }
    return name
  }
  return (
    <div className='image-container'>
      <img src={image} alt={'Foto do animal' + name} className='image-display' />
      <div className='name-bg'>
        <p className='name'>{formatName(name)}</p>
        </div>  
    </div>
  )
}


export default ImageDisplay
