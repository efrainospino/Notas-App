import React from 'react';
import '../estilo-login.css';

const Input = ({estado, cambiarEstado, placeholder, label, name, tipo, alertMensaje, expresionRegular, funcion}) => {

    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }

    const validacion = () => {
        if(expresionRegular){
            if(expresionRegular.test(estado.campo)){
                cambiarEstado({...estado, valido: true});
            }else{
                cambiarEstado({...estado, valido: false});
            }
        }
        if(funcion){
            funcion();
        }
    }
 
  return (
    <div id='inputs-registro'>
        <label htmlFor={name} className="form-label mt-2">{label}</label>
        <input
            type={tipo} 
            name={name} 
            required 
            spellCheck="false" 
            autoComplete="off"  
            className={`form-control shadow-none ${estado.valido ? 'is-valid' : ''} ${estado.valido === false ? 'is-invalid' : ''}`} 
            id={name} 
            placeholder={placeholder} 
            value={estado.campo}  
            onChange={onChange} 
            onKeyUp={validacion}    
            onBlur={validacion}
        />
        <div 
            className={`alert mb-0 alert-danger mt-1 py-0 ${estado.valido===false ? '' : 'd-none'} `} 
            id='alert-nombre' 
            role="alert">
                {alertMensaje}
        </div>
    </div>
  )
}

export default Input