import React, { useEffect } from 'react';
import './style.css';

export default function Toast({ type = 'success', message = '', visible, onClose }) {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      onClose(); 
    }, 3500);

    return () => clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
}
