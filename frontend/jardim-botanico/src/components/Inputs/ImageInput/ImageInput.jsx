import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import ImageInputSVG from '../../../assets/svg/ImageInputSVG';

const ImageInput = ({ onFileSelect, showError, resetTrigger }) => {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      onFileSelect(file); 
    } else {
      setPreview(null);
      onFileSelect(null);
    }
  };


  useEffect(() => {
    setPreview(null);
    onFileSelect(null);
    if (inputRef.current) {
      inputRef.current.value = ''; 
    }
  }, [resetTrigger]);

  return (
    <label className={`upload-image-container ${showError ? 'image-error' : ''}`}>
      {preview ? (
        <img src={preview} alt="Prévia" className="image-preview" />
      ) : (
        <>
          <ImageInputSVG width={80} height={80} color='var(--azul-ufsm)' />
          <span>Adicione a foto do animal</span>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </label>
  );
};

export default ImageInput;
