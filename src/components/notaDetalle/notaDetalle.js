import React, {useContext, useEffect, useState, useCallback} from 'react';
import './notaDetalle.css';
import { Link, useParams, useNavigate } from "react-router-dom";

import clienteAxios from '../../config/axios';
import {context} from '../../context/context';
import Swal from 'sweetalert2';


const NotaDellate = () => {

    let Navigate = useNavigate();

    const {auth, guardarAuth} = useContext(context);
    const { noteId } = useParams();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');


    const cargarNota = useCallback ( async () =>{
        const respuesta = await clienteAxios.get(`/notas/${noteId}`, {
            headers: {
                Authorization : `Bearer ${auth.token}`
            }
        });
        setTitle(respuesta.data.title);
        setDescription(respuesta.data.description);
        setImage(respuesta.data.image);

    }, [noteId, auth.token])

    useEffect(() => {
        if(auth.token === '' && auth.auth === false){
            Navigate("/login", { replace: true });
        }
        cargarNota();
    }, [auth.token, auth.auth, Navigate, cargarNota, image]);

    const actualizarNota = async (e) =>{
        e.preventDefault();

        const actualizarNota= {
            title: title,
            description: description
        }

        try {
            const respuesta = await clienteAxios.put(`/notas/${noteId}`, actualizarNota, {
                headers: {
                    Authorization : `Bearer ${auth.token}`
                }
            });

            if(respuesta.data){
                Swal.fire({
                    customClass: {
                    icon: 'mx-auto mt-3',
                    },
                    position: 'top-end',
                    icon: 'success',
                    title: 'Se actualizó correctamente.',
                    showConfirmButton: false,
                    timer: 1000,
                    width: 350
                });
                Navigate("/notas", { replace: true });
            }
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

    const eliminarNota = async () =>{

        const eliminarNota= {
            userId: auth.idUsuario
        }

        try {
            const respuesta = await clienteAxios.delete(`/notas/${noteId}`, {
                data: eliminarNota,
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
                Navigate("/notas", { replace: true });
            }
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

    const eliminarImage = async () =>{

        try {
            await clienteAxios.put(`/notas/image/${noteId}`,{}, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            setImage('');

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
            timer: 700,
            width: 250
            });
        }
    }

  return (
    <form onSubmit={actualizarNota}>
        <nav className="navbar navbar-expand-lg sticky-top" id='Navbar-nota'>
            <div className="container-fluid">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item ms-2">
                        <Link className="nav-link" aria-current="page" to="/notas"><i className="fa-solid fa-arrow-left fa-lg"></i></Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item me-2">
                        <button type="button" className="nav-link btn btn-outline border-0 me-3"><i className="fa-solid fa-trash-can fa-lg" onClick={eliminarNota} style={{color: 'red'}}></i></button>
                    </li>
                    <li className="nav-item me-2">
                        <button type="submit" className="nav-link btn btn-outline border-0"><i className="fa-solid fa-check fa-lg"></i></button>
                    </li>
                </ul>
            </div>
        </nav>
        <div className='container px-0 my-5 mx-auto' id='container-agregar-notas'>
            {
                image?.length > 0 ? 
                    (<div className="position-relative">
                        <img src={`http://localhost:5001/uploads/${image}`} id='imagen-agregar' alt={title} />
                        <button type="button" className="nav-link btn btn-outline border-0 mt-3 me-3 position-absolute top-0 end-0" onClick={eliminarImage}><i className="fa-solid fa-trash-can fa-2x" style={{color: 'red'}}></i></button>
                    </div>) 
                    : null
            }
            <div className="my-3 p-0">
                <div>
                    <input type="text" required spellCheck="false" autoComplete='off' name='title' className="form-control shadow-none fw-bold" id='input-titulo' placeholder="Titulo" aria-label="Titulo" onChange={(e) => {setTitle(e.target.value)}} value={title}/>
                    <div id="contenedor">
                        <textarea rows={50} id="agregar-textarea" name='description' spellCheck="false" placeholder='Escribe algo...' className='form-control shadow-none ps-3 me-3 mb-3' contentEditable="true" autoComplete='off' onChange={(e) => {setDescription(e.target.value)}} value={description}></textarea>
                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}

export default NotaDellate