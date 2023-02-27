import React from 'react';
import './Input.css';

function Input({type, text, name, placeholder, handleChange, value, multiple}) {
  return (
    <div className='form_control'>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...( multiple ? {multiple} : '' )}
        />
    </div>
  )
}

export default Input;