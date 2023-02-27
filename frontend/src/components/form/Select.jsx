import React from 'react';
import './Select.css';

function Select({text, name, options, handleChange, value}) {

  return (
    <div className='form_control'>
      <label htmlFor={name}>{text}:</label>
      <select
        name={name}
        id={name}
        onChange={handleChange}
        value={value}
        >
          <option disabled>Seleciona uma opção</option>
          {options.map((option, index) => (
          <option
            key={index + option}
            value={option}
            >
              {option}
            </option>
            ))}
      </select>
    </div>
  )
}

export default Select