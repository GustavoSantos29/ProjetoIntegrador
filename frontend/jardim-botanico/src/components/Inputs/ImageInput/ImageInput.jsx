import React from 'react'
import './style.css'
import { useState } from 'react';
import ImageInputSVG from '../../../assets/svg/ImageInputSVG'

const ImageInput = ({ onFileSelect, showError }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(file));
        onFileSelect(file); // envia o arquivo para o pai
      } else {
        setPreview(null);
        onFileSelect(null);
      }
  };

  return (
    <label className={`upload-image-container ${showError ? 'image-error' : ''}`}>
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
