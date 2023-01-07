import React from 'react';
import '../estilo-login.css';

const Input = ({placeholder, label, name, tipo, funcion, autoComplete}) => {
  return (
    <div id='inputs-registro'>
        <label htmlFor={name} className="form-label mt-2">{label}</label>
        <input
            className="form-control shadow-none"
            type={tipo} 
            name={name} 
            required 
            spellCheck="false" 
            autoComplete={autoComplete ? autoComplete : 'off'}  
            id={name} 
            placeholder={placeholder} 
            onChange={funcion} 
        />
    </div>
  )
}

export default Input