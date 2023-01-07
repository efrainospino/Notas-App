import React, { useState, useContext } from 'react';
import './estilo-login.css';
import { Link } from "react-router-dom";
import Input from './componenteInput/Input';
import { useNavigate } from "react-router-dom";

import clienteAxios from '../../config/axios';
import {context} from '../../context/context'
import Swal from 'sweetalert2';

const Login = () => {

  const [credenciales, guardarCredenciales] = useState({})
  let Navigate = useNavigate();

  const {auth, guardarAuth} = useContext(context);


  const hacerAutenticacion = async (e) =>{
    e.preventDefault();

    try {
      const respuesta = await clienteAxios.post('/usuarios/autenticar', credenciales);
      const { token, idUsuario, user } = respuesta.data;
      localStorage.setItem('token', token );

      guardarAuth({
        token,
        idUsuario,
        user,
        auth: true
      })

      Swal.fire({
        customClass: {
          icon: 'mx-auto mt-3',
        },
        icon: 'success',
        title: 'Login correcto!',
        showConfirmButton: false,
        timer: 1000,
        width: 300
      });

      Navigate("/notas", { replace: true });

    } catch (error) {
      console.log(error.response?.data?.mensaje);
      Swal.fire({
        customClass: {
          icon: 'mx-auto mt-3',
        },
        icon: 'error',
        title: error.response?.data?.mensaje,
        showConfirmButton: false,
        timer: 1000,
        width: 300
      });
    }
  }

  const leerDatos = (e) => {
    guardarCredenciales({
        ...credenciales,
        [e.target.name]: e.target.value
      })
  }

  return (
    <div className='container d-flex align-items-center' id='container-login'>
        <div className="card mx-auto" id='card-login'>
            <div className="card-body">
                <h5 className="card-title text-center fw-bold">Ingresa tu cuenta</h5>
                <form onSubmit={hacerAutenticacion} id='formulario'>
                  <Input
                    placeholder= "Ingresa tu correo"
                    name="email"
                    tipo="email"
                    label="Correo"
                    funcion={leerDatos}
                    autoComplete="on"
                  />
                  <Input
                    placeholder= "Ingresa tu contraseña"
                    name="password"
                    tipo="password"
                    label="Contraseña"
                    funcion={leerDatos}
                  />
                  <div className="d-grid gap-2 mt-3">
                      <button id='button-ingresar' className="btn btn-primary shadow-none" type="submit">Ingresar</button>
                  </div>
                </form>
                <p className='text-center mt-3 mb-0'>No tienes una cuenta aún? <Link className='ancla-registrarse' to="/registro">Registrate!</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login