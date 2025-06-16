// src/components/IsLoading/IsLoading.jsx
import React from 'react';
import './style.css';

const IsLoading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Carregando...</p>
    </div>
  );
};

export default IsLoading;
