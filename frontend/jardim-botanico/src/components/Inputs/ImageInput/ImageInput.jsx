import React from 'react'
import './style.css'
import { useState } from 'react';
import ImageInputSVG from '../../../assets/svg/ImageInputSVG'
const ImageInput = ({required}) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <label className="upload-image-container">
      {preview ? (
        <img src={preview} alt="Prévia" className="image-preview" />
      ) : (
        <>
          <ImageInputSVG width={80} height={80} color='var(--azul-ufsm)'/>
          <span>Adicione a foto do animal</span>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </label>
  );
};

export default ImageInput
