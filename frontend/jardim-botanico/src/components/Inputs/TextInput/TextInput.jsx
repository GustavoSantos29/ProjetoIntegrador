import React from 'react';
import { useState } from 'react';
import OpenEye from '../../../assets/svg/OpenEye';
import ClosedEye from '../../../assets/svg/ClosedEye';
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
    type = 'text',
    label = '',
    required = false,
    size = 'big',
    value = '',
    onChange,
    showError = false,
    id = '',
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = type === 'password';
    const inputType = isPasswordField && showPassword ? 'text' : type;

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    return (
        <div className={`input-container ${size === 'big' ? 'big' : 'small'}`}>
            <input
                type={inputType}
                id={id}
                className={`input ${showError ? 'input-error' : ''}`}
                placeholder=' '
                value={value}
                onChange={onChange}
            />
            <label className='label' htmlFor={id}>
                {label} <span className={required ? 'required' : 'hide'}>*</span>
            </label>

            {isPasswordField && (
                <div className='eye' onClick={togglePasswordVisibility}>
                    {showPassword ? <OpenEye /> : <ClosedEye />}
                </div>
            )}
        </div>
    );
};

export default TextInput;
