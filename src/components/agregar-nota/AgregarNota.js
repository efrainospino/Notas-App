import React from 'react';
import './estilosagregarnota.css';
import { Link } from "react-router-dom";

const AgregarNota = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg sticky-top" id='Navbar-nota'>
            <div className="container-fluid">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item ms-2">
                        <Link className="nav-link" aria-current="page" to="/notas"><i className="fa-solid fa-arrow-left fa-lg"></i></Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item me-2">
                        <Link className="nav-link" to="/notas"><i className="fa-solid fa-check fa-lg"></i></Link>
                    </li>
                </ul>
            </div>
        </nav>
        <div className='container px-0 my-5 mx-auto' id='container-agregar-notas'>
            <img src="https://adrianacotte.com/wp-content/uploads/2021/05/hamburguesa01.jpeg" id='imagen-agregar' alt="imagen" />
            <form className="my-3 p-0" role="search">
                <div>
                    <input type="text" required spellCheck="false" autoComplete='none' className="form-control shadow-none fw-bold" id='input-titulo' placeholder="Titulo" aria-label="Titulo"/>
                        <div id="contenedor">
                            <div id="agregar-textarea" spellCheck="false" placeholder='Escribe algo...' className='ps-3 me-3 mb-3' contentEditable="true"></div>
                        </div>
                        <input type="hidden" name="titulo" id="tituloOculto" />
                </div>
            </form>
        </div>
    </>
  )
}

export default AgregarNota