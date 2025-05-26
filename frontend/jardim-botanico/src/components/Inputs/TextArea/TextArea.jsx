import React from 'react'
import './style.css'

const TextArea = ({ label = '', required = false}) => {
  return (
    <div className='textArea-container'>
      <textarea className='textArea' placeholder=' '></textarea>
        <label className='label'>{label} <span className={required? 'required':'hide'}>*</span></label>
      </div>
  )
}

export default TextArea
