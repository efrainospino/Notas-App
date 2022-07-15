import React from 'react';
import './estilos-buscar.css';

const Buscar = () => {
  return (
    <div>
        <form className="container mx-auto my-3 p-0" role="search">
            <div className="input-group">
                <span className="input-group-text" id='iconbuscar'><i className="fa-solid fa-magnifying-glass"></i></span>
                <input type="search" spellCheck="false" autoComplete='none' className="form-control shadow-none" id='inputbuscar' placeholder="Buscar" aria-label="Buscar"/>
            </div>
        </form>
    </div>
  )
}

export default Buscar