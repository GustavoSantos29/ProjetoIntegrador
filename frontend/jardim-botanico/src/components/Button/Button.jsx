import React from 'react';
import './style.css'; 
/**
 * 
 * @param type submit | reset
 * @param onClick
 * @param children
 * @param className
 * @returns 
 */

const Button = ({ type = 'button',
    onClick,
    children,
    className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-button ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
