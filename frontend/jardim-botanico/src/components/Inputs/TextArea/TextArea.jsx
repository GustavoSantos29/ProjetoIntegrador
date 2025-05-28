import React from 'react'
import './style.css'
/** 
@param label
@param required
@param value
@param onChange
@param showError
**/
const TextArea = ({
  label = '',
  required = false,
  value = ' ',
  onChange,
  showError = false,
  id = ''}) => {
  return (
    <div className='text-area-container'>
      <textarea className={`text-area ${showError ? 'text-area-error' : ''}`}
        id={id}
        placeholder=' '
        value={value}
        onChange={onChange}></textarea>
        <label htmlFor={id} className='label'>{label} <span className={required? 'required':'hide'}>*</span></label>
      </div>
  )
}

export default TextArea
