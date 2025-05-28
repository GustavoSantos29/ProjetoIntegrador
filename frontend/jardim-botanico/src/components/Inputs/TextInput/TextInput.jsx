import React from 'react'
import './style.css';
/** 
@param label
@param required
@param size big | small
@param value
@param onChange
@param showError
**/

const TextInput = ({
  label = '',
  required = false,
  size = 'big',
  value = ' ',
  onChange,
  showError = false,
  id =''}) => {
  
  return (
    <div className={`input-container ${size == 'big' ? 'big' : 'small'}`}>
      <input type='text'
        id={id}
        className={`input ${showError? 'input-error' : ''}`}
        placeholder=' '
        value={value}
        onChange={onChange}/>
      <label className='label' htmlFor={id}>
        {label} <span className={required ? 'required' : 'hide'}>*</span>
      </label>
      </div>
  )
}

export default TextInput
