import React, { useState } from 'react';
import './estilo-login.css';
import { Link } from "react-router-dom";
import Input from './componenteInput/Input';

const Login = () => {

  const [correo, setCorreo] = useState({campo:"", valido:null});
  const [contraseña, setContraseña] = useState({campo:"", valido:null});

  return (
    <div className='container d-flex align-items-center' id='container-login'>
        <div className="card mx-auto" id='card-login'>
            <div className="card-body">
                <h5 className="card-title text-center fw-bold">Ingresa tu cuenta</h5>
                <Input
                  estado={correo}
                  cambiarEstado={setCorreo}
                  placeholder= "Ingresa tu correo"
                  name="correo-register"
                  tipo="email"
                  label="Correo"
                />
                <Input
                  estado={contraseña}
                  cambiarEstado={setContraseña}
                  placeholder= "Ingresa tu contraseña"
                  name="contraseña-register"
                  tipo="password"
                  label="Contraseña"
                />
                <div className="d-grid gap-2 mt-3">
                    <button id='button-ingresar' className="btn btn-primary shadow-none" type="button">Ingresar</button>
                </div>
                <p className='text-center mt-3 mb-0'>No tienes una cuenta aún? <Link className='ancla-registrarse' to="/registro">Registrate!</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login