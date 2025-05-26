import React from 'react'
import './style.css';
/** 
@param label
@param required
@param size big | small
**/

const TextInput = ({ label = '', required = false, size = 'big'}) => {
  return (
    <div className={`input-container ${size == 'big' ? 'big' : 'small'}`}>
      <input type='text' className='input' placeholder=' '></input>
        <label className='label'>{label} <span className={required? 'required':'hide'}>*</span></label>
      </div>
  )
}

export default TextInput
