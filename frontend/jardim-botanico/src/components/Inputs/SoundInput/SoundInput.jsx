import React from 'react'
import './style.css'
import { useState } from 'react';
import SoundInputSVG from '../../../assets/svg/SoundInputSVG'

const SoundInput = ({required}) => {
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
    <label className="uploadsound--container">
      {preview ? (
        <img src={preview} alt="Prévia" className="sound-preview" />
      ) : (
        <>
          <SoundInputSVG height={40} width={40} color='var(--azul-ufsm)'/>
          <span>Adicione o som do animal</span>
        </>
      )}
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </label>
  );
};

export default SoundInput
