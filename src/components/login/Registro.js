import React, {useState} from 'react';
import './estilo-login.css';
import { Link } from "react-router-dom";
import Input from './componenteInput/Input';
import { useNavigate } from "react-router-dom";

import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

const Registro = () => {

  const [registro, guardarRegistro] = useState({})
  let Navigate = useNavigate();

  const [errores, setErrores] = useState()

  const hacerRegistro = async (e) =>{
    e.preventDefault();

    try {
      const respuesta = await clienteAxios.post('/usuarios/add', registro);
      setErrores(respuesta?.data?.errores);
      if(respuesta.data.mensaje){
        Navigate("/login", { replace: true });

        Swal.fire({
          customClass: {
            icon: 'mx-auto mt-3',
          },
          position: 'top-end',
          icon: 'success',
          title: 'Registro existoso',
          showConfirmButton: false,
          timer: 1500,
          width: 250
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        customClass: {
          icon: 'mx-auto mt-3',
        },
        position: 'top-end',
        icon: 'error',
        title: 'hubo un error',
        width: 250
      });
    }
  }
  
  const leerDatos = (e) => {
    guardarRegistro({
        ...registro,
        [e.target.name]: e.target.value
      })
  }

  return (
    <div className='container d-flex align-items-center' id='container-login'>
        <div className="card mx-auto my-5" id='card-login'>
            <div className="card-body">
                <h5 className="card-title text-center fw-bold">Crea tu cuenta</h5>
                <form onSubmit={hacerRegistro} id='formulario'>
                  {errores && errores.map(error => 
                      (<div 
                        className={`alert mb-0 alert-danger mt-1 py-0`} 
                        id='alert-nombre' 
                        role="alert"
                        key={error.param}>
                            {error.msg}
                      </div>) 
                  )}
                  <Input
                    placeholder= "Ingresa tu nombre completo"
                    name="nombre"
                    tipo="text"
                    label="Nombre"
                    funcion={leerDatos}
                  />  
                  <Input
                    placeholder= "Ingresa tu correo"
                    name="email"
                    tipo="email"
                    label="Correo"
                    funcion={leerDatos}
                  />
                  <Input
                    placeholder= "Ingresa tu contraseña"
                    name="password"
                    tipo="password"
                    label="Contraseña"
                    funcion={leerDatos}
                  />
                  <Input
                    placeholder= "Confirma tu contraseña"
                    name="confirmarPassword"
                    tipo="password"
                    label="Confirma tu contraseña"
                    funcion={leerDatos}
                  />
                  <div className="d-grid gap-2 mt-4">
                      <button id='button-ingresar' className="btn btn-primary shadow-none" type="submit">Registrar</button>
                  </div>
                </form>
                <p className='text-center mt-3 mb-0'>Ya tienes una cuenta? <Link className='ancla-registrarse' to="/login">ingresa ya!</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Registro
