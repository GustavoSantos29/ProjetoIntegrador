import React from 'react'
import './style.css'
import Triangle from '../../assets/svg/Triangle'
import { useState } from 'react'
import EditIcon from '../../assets/svg/EditIcon'
/**
 * 
 * @param name
 * @param onView
 * @param onEdit
 * @param onDelete
 */
const Dropdown = ({ name, onView, onDelete, onEdit }) => {
  const [dropdownState, setState] = useState(false)
  const handleState =(e)=> {
    if (dropdownState == false) {
      setState(true)
    }
    else {
      setState(false)
    }
  }
  return (
    <div>
    <div className='dropdown-container' onClick={handleState}>
      <div className='dropdown-left'>
        <p>{name}</p>
      </div>
      <div className={`dropdown-right ${dropdownState ? "active" : "default"}`}>
        <Triangle color={dropdownState? 'var(--azul-ufsm)':'var(--cinza)'} />
      </div>
      </div>
      <div className={`dropdown-subSection ${dropdownState ? "show" : ""}`}>
      <div className="dropdown-item" onClick={onEdit}>
          <p>Editar animal</p>
          {<EditIcon />}
        </div>
        <hr />
        <div className="dropdown-item" onClick={onDelete}>
          <p>Excluir animal</p>
        </div>
      <hr />
        <div className="dropdown-item" onClick={onView}>
          <p>Gerar QRCode</p>

        </div>

      </div>

      </div>
  );
};
export default Dropdown
