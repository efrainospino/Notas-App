import React, {useState} from 'react';
import './estilo-login.css';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Input from './componenteInput/Input';

const Registro = () => {

  const [nombre, setNombre] = useState({campo:"", valido:null});
  const [correo, setCorreo] = useState({campo:"", valido:null});
  const [contraseña, setContraseña] = useState({campo:"", valido:null});
  const [contraseña2, setContraseña2] = useState({campo:"", valido:null});
  const [formularioValido, setFormularioValido] = useState(null);

  let Navigate = useNavigate();

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  }

  const validarPassword2 = () => {
    if(contraseña.campo.length> 0){
      if(contraseña.campo !== contraseña2.campo){
        setContraseña2({...contraseña2, valido: false});
      }else{
        setContraseña2({...contraseña2, valido: true});
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      nombre.valido === true &&
      correo.valido === true &&
      contraseña.valido === true &&
      contraseña2.valido === true
    ){
      setFormularioValido(true);
      //limpiar campos
      setNombre({campo:'', valido: null});
      setCorreo({campo:'', valido: null});
      setContraseña({campo:'', valido: null});
      setContraseña2({campo:'', valido: null});

      //redireccionar al login

      Navigate("/login", { replace: true });

      // popup - registro exitoso

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
    }else{
      setFormularioValido(false);
    }
  }

  return (
    <div className='container d-flex align-items-center' id='container-login'>
        <div className="card mx-auto my-5" id='card-login'>
            <div className="card-body">
                <h5 className="card-title text-center fw-bold">Crea tu cuenta</h5>
                <form onSubmit={onSubmit} id='formulario'>
                  <Input
                    estado={nombre}
                    cambiarEstado={setNombre}
                    placeholder= "Ingresa tu nombre completo"
                    name="nombre-register"
                    tipo="text"
                    label="Nombre"
                    alertMensaje="El nombre debe tener minimo 4 letras y no debe tener caracteres especiales."
                    expresionRegular={expresiones.nombre}
                  />  
                  <Input
                    estado={correo}
                    cambiarEstado={setCorreo}
                    placeholder= "Ingresa tu correo"
                    name="correo-register"
                    tipo="email"
                    label="Correo"
                    alertMensaje="El correo es invalido."
                    expresionRegular={expresiones.correo}
                  />
                  <Input
                    estado={contraseña}
                    cambiarEstado={setContraseña}
                    placeholder= "Ingresa tu contraseña"
                    name="contraseña-register"
                    tipo="password"
                    label="Contraseña"
                    alertMensaje="La contraseña debe tener entre 4 a 12 caracteres."
                    expresionRegular={expresiones.password}
                  />
                  <Input
                    estado={contraseña2}
                    cambiarEstado={setContraseña2}
                    placeholder= "Confirma tu contraseña"
                    name="contraseña2-register"
                    tipo="password"
                    label="Confirma tu contraseña"
                    alertMensaje="Las contraseñas no coinciden."
                    funcion={validarPassword2}
                  />
                  <div className="d-grid gap-2 mt-4">
                      <button id='button-ingresar' className="btn btn-primary shadow-none" type="submit">Registrar</button>
                  </div>
                  {formularioValido === false && <div className="alert text-center alert-danger mt-2 mb-0 py-2" id='alert-formulario-error' role="alert">
                  Por favor, rellene el formulario correctamente.
                  </div>}
                </form>
                <p className='text-center mt-3 mb-0'>Ya tienes una cuenta? <Link className='ancla-registrarse' to="/login">ingresa ya!</Link></p>
            </div>
        </div>
    </div>
  )
}

export default Registro
