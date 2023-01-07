import React, {useContext} from 'react';
import './estilos-navbar.css';
import Logo from '../../Media/Logo-navbar.png';
import { NavLink, useNavigate } from "react-router-dom";


import {context} from '../../context/context'

const Navbar = () => {

    let Navigate = useNavigate();
    const {auth, guardarAuth, setNotas} = useContext(context);

    const cerrarSesion = () => {
        guardarAuth({
            token: '',
            idUsuario: '',
            auth: false,
            user: '',
            notas: {}
        });
        setNotas([]);
        localStorage.setItem('token', '');
        Navigate("/login", { replace: true });
    }

  return (
    <>
        <nav className="navbar navbar-expand-lg" id='Navbar'>
            <div className="container-fluid">
                <NavLink className="navbar-brand fw-light" to="/notas">
                    <img src={Logo} className='d-inline-block align-text-center' width="40" height="40" alt="logo" />
                    Notas-App
                </NavLink>
                <button className="navbar-toggler shadow-none btn-responsi" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fw-bold">
                        <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/notas">Notas</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/tareas">Tareas</NavLink>
                        </li>
                        <li className="nav-item dropdown me-5 pe-3">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-user fa-lg me-1" id='iconcss'></i> {auth.user}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown" id='dropdowncss'>
                                <li>
                                    <button className="btn btn-outline border-0" onClick={cerrarSesion}>
                                    <i className="fa-solid fa-arrow-right-from-bracket fa-lg me-2" id='iconcss'></i>
                                    Cerrar sesión
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}


export default Navbar