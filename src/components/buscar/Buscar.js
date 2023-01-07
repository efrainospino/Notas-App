import React, {useContext} from 'react';
import './estilos-buscar.css';
import {context} from '../../context/context'

const Buscar = () => {

  const {search} = useContext(context);

  return (
    <div>
        <form className="container mx-auto my-3 p-0" role="search">
            <div className="input-group">
                <span className="input-group-text" id='iconbuscar'><i className="fa-solid fa-magnifying-glass"></i></span>
                <input type="search" spellCheck="false" autoComplete='off' className="form-control shadow-none" id='inputbuscar' placeholder="Buscar" aria-label="Buscar" onChange={(e) => {search(e.target.value)}}/>
            </div>
        </form>
    </div>
  )
}

export default Buscar