import React, {useContext, useEffect, useRef, useState} from 'react';
import './estilos-tareas.css';
import Swal from 'sweetalert2';
import Navbar from '../navbar/Navbar';
import Buscar from '../buscar/Buscar';

import { useNavigate } from "react-router-dom";

import clienteAxios from '../../config/axios';
import {context} from '../../context/context';

const Tareas = () => {

let Navigate = useNavigate();

const {auth, setTareas, setFilterTareas, filtertareas} = useContext(context);

const tarea = useRef([]);

const [render, setRender] = useState(false);

useEffect(() => { 

  if(auth.token !== ''){
      try {
        const consultarAPI = async () =>{
          const notasConsulta = await clienteAxios.get(`/usuarios/${auth.idUsuario}`, {
              headers: {
                  Authorization : `Bearer ${auth.token}`
              }
          }); 
          const tareas = notasConsulta.data.tasks;
          setTareas(tareas);
          setFilterTareas(tareas);

        }
        consultarAPI();
      } catch (error) {
        if(error.response.status === 500){
          Navigate("/login", { replace: true });
        }
      }
  }else{
    Navigate("/login", { replace: true });
  }
}, [Navigate, auth.idUsuario, auth.token, setFilterTareas, setTareas, render]);

const createTarea = async (tarea) => {
  try {
    const respuesta = await clienteAxios.post('/tareas/add', tarea,{
        headers: {
            'Authorization': `Bearer ${auth.token}`
        }
    });

    if(respuesta.data.errores){
    Swal.fire({
        customClass: {
        icon: 'mx-auto mt-3',
        },
        position: 'top-end',
        icon: 'error',
        title: respuesta.data.errores[0].msg,
        showConfirmButton: false,
        timer: 1000,
        width: 350
    });
    }

    if(respuesta.data.mensaje){
        Swal.fire({
            customClass: {
            icon: 'mx-auto mt-3',
            },
            position: 'top-end',
            icon: 'success',
            title: respuesta.data.mensaje,
            showConfirmButton: false,
            timer: 1000,
            width: 350
        });
        Navigate("/tareas", { replace: true });
    }
    setRender(!render);
} catch (error) {
    console.log(error);
    Swal.fire({
    customClass: {
        icon: 'mx-auto mt-3',
    },
    position: 'top-end',
    icon: 'error',
    title: 'hubo un error',
    width: 250,
    showConfirmButton: false,
    timer: 1000,
    });
}
} 


if(!auth.auth){
    Navigate("/login", { replace: true });
}

const handleInput = async () =>{
  const swalNewTarea = Swal.mixin({
      customClass: {
        icon: 'mx-auto mt-5',
        confirmButton: 'btn btn-alert-confirm mx-1 mt-3',
        cancelButton: 'btn btn-alert-cancel mx-1 mt-3',
        input: 'input-alert shadow-none mx-3 mt-3'
      },
      buttonsStyling: false
    })

  swalNewTarea.fire({
      title: 'Ingresa tu tarea',
      width: 450,
      input: 'text',
      inputValue: '',
      inputAttributes: {
      autocapitalize: 'off',
      spellcheck: 'false',
      inputPlaceholder: 'Nueva nota'
      },
      showCancelButton: true,
      confirmButtonText: 'Crear',
    }).then((result) => {
      if (result.isConfirmed) {
        const input = result.value;
        async function apiCall(input) {
          const description = input;
          tarea.current = {
            userId: auth.idUsuario, 
            description
          }
          createTarea(tarea.current);
        }
        apiCall(input);
      } else if (result.isDenied) {
        Swal.fire('No se pudo crear', '', 'info')
      }
    })
}

const eliminarTarea = async (tareaId) =>{

  const eliminarTarea= {
      userId: auth.idUsuario
  }

  try {
      const respuesta = await clienteAxios.delete(`/tareas/${tareaId}`, {
          data: eliminarTarea,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${auth.token}`
          }
      });

      if(respuesta.data){
          Swal.fire({
              customClass: {
              icon: 'mx-auto mt-3',
              },
              position: 'top-end',
              icon: 'success',
              title: 'Se eliminó correctamente.',
              showConfirmButton: false,
              timer: 700,
              width: 350
          });
          Navigate("/tareas", { replace: true });
      }

      setRender(!render);
  } catch (error) {
      if(error.response.status === 500){
          Navigate("/login", { replace: true });
      }
      console.log(error);
      Swal.fire({
      customClass: {
          icon: 'mx-auto mt-3',
      },
      position: 'top-end',
      icon: 'error',
      title: 'hubo un error',
      showConfirmButton: false,
      timer: 1000,
      width: 250
      });
  }
}

const editarTarea = async (tarea, id) => {
  console.log(tarea);
  
  try {
    const respuesta = await clienteAxios.put(`/tareas/${id}`, tarea,{
        headers: {
            'Authorization': `Bearer ${auth.token}`
        }
    });

    if(respuesta){
        Swal.fire({
            customClass: {
            icon: 'mx-auto mt-3',
            },
            position: 'top-end',
            icon: 'success',
            title: 'Se editó correctamente.',
            showConfirmButton: false,
            timer: 1000,
            width: 350
        });
        Navigate("/tareas", { replace: true });
    }
    setRender(!render);
} catch (error) {
    console.log(error);
    Swal.fire({
    customClass: {
        icon: 'mx-auto mt-3',
    },
    position: 'top-end',
    icon: 'error',
    title: 'hubo un error',
    width: 250,
    showConfirmButton: false,
    timer: 1000,
    });
}
} 

const changeRefCheck = (infoTarea, id) =>{
  if(infoTarea.realizado === true){
    tarea.current = {
      realizado: false
    }
  }else{
    tarea.current = {
      realizado: true
    }
  }
  editarCheck(id);
}

const editarCheck = async (id) => {

  try {
    await clienteAxios.put(`/tareas/${id}`, tarea.current,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`
        }
    });
    setRender(!render);
} catch (error) {
    console.log(error);
    Swal.fire({
    customClass: {
        icon: 'mx-auto mt-3',
    },
    position: 'top-end',
    icon: 'error',
    title: 'hubo un error',
    width: 250,
    showConfirmButton: false,
    timer: 1000,
    });
}
} 

const abrirTarea = (infoTarea) =>{
  const swalNewTarea = Swal.mixin({
    customClass: {
      icon: 'mx-auto mt-5',
      confirmButton: 'btn btn-alert-confirm mx-1 mt-3',
      cancelButton: 'btn btn-alert-cancel mx-1 mt-3',
      input: 'input-alert shadow-none mx-3 mt-3'
    },
    buttonsStyling: false
  })

swalNewTarea.fire({
    width: 450,
    input: 'text',
    inputValue: infoTarea?.description,
    inputAttributes: {
    autocapitalize: 'off',
    spellcheck: 'false',
    inputPlaceholder: 'Editar nota'
    },
    showCancelButton: true,
    confirmButtonText: 'Editar',
  }).then((result) => {
    if (result.isConfirmed) {
      const input = result.value;
      async function apiCall(input) {
        const description = input;
        tarea.current = {
          description
        }
        editarTarea(tarea.current, infoTarea._id);
      }
      apiCall(input);
    } else if (result.isDenied) {
      Swal.fire('No se pudo crear', '', 'info')
    }
  })
}

  return (
    <>
      <Navbar/>
      <Buscar/>
        <div className='container mt-5 mx-auto'>
            <div className='row mb-5'>
                <div className="d-flex align-items-center col-md-6 col-12">
                    <div className='card my-1 align-baseline' id='card-agregar-tareas' onClick={()=> handleInput()}>
                        <div className="card-body py-0">
                            <h5 className='card-title fw-bold mb-0 align-middle'>Agregar una nueva nota.</h5>
                        </div>
                    </div>
                </div>
                {filtertareas && filtertareas.map((tarea) => (
                    <div className="d-flex align-items-center col-md-6 col-12" key={tarea?._id?._id}>
                    <input className="form-check-input mt-0 shadow-none align-baseline me-1" type="checkbox" defaultChecked={tarea._id.realizado ? 'checked' : ''} value="" id="flexCheckDefault" onClick={()=>{changeRefCheck(tarea?._id, tarea?._id?._id)}}/>
                    <div className='card my-1 align-baseline' onClick={()=>{abrirTarea(tarea?._id)}} id='card-tareas'>
                        <div className="card-body py-0">
                            <h5 className={`card-title fw-bold mb-0 align-middle ${tarea._id.realizado && 'text-decoration-line-through'}`}id='text-card-tareas'>{tarea?._id?.description}</h5>
                        </div>
                    </div>
                    <button type="button" onClick={() => {eliminarTarea(tarea?._id?._id)}} className="nav-link btn btn-outline border-0 ms-2"><i className="fa-solid fa-trash-can fa-lg" style={{color: 'red'}}></i></button>
                    </div>
                  ) 
                )}
            </div>
        </div>
    </>
  )
}

export default Tareas