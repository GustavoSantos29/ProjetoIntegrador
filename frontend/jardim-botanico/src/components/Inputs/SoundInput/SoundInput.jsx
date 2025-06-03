import React, { useState, useEffect } from 'react';
import './style.css';
import SoundInputSVG from '../../../assets/svg/SoundInputSVG';
import Pencil from '../../../assets/svg/Pencil';

const SoundInput = ({ onFileSelect, resetTrigger }) => {
  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    setFileName(null);
  }, [resetTrigger]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setFileName(file.name);
      onFileSelect(file);
    } else {
      setFileName(null);
      onFileSelect(null);
    }
  };

  return (
    <label className='upload-sound-container'>
      {fileName ? (
        <div className="sound-preview">
          <span>{fileName}</span>
          <div className='sound-edit'>
            <Pencil color='var(--azul-ufsm)'/>
            </div>
        </div>
      ) : (
        <>
          <SoundInputSVG height={40} width={40} color="var(--azul-ufsm)" />
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

export default SoundInput;
