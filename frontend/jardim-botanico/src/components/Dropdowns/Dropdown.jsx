import React from 'react'
import './style.css'
import Triangle from '../../assets/svg/Triangle'
import { useState } from 'react'
/**
 * 
 * @param name
 */
const Dropdown = ({ name }) => {
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
        <p>Editar animal</p>
        <p>Excluir animal</p>
        <p>Gerar Qrcode</p>
      </div>

      </div>
  );
};
export default Dropdown
