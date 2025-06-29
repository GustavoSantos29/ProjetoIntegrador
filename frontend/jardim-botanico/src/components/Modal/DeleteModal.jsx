import React from 'react'
import Button from '../Button/Button'
import Arrow from '../../assets/svg/Arrow'
import './style.css'


export default function DeleteModal({children, onConfirm, onCancel, visible}) {

    if (!visible) return null;

  return (
      <div className="modal-bg">
      
        <div className="modal-content">
        <h3>Deseja excluir {children}?</h3>
        <div className="modal-buttons">
          <Button onClick={onConfirm} children='Confirmar' />
          <Button onClick={onCancel} children='Cancelar' className='reset'/>
        </div>
      </div>
    </div>
  );
}

