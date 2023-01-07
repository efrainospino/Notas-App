import React, {useContext, useEffect, useState, useRef} from 'react';
import './estilosagregarnota.css';
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import clienteAxios from '../../config/axios';
import {context} from '../../context/context'
import Swal from 'sweetalert2';


const AgregarNota = () => {

    let Navigate = useNavigate();

    const {auth} = useContext(context);
    const image = useRef({})
    const [error, setError] = useState(null);
    const [nota, newNota] = useState({
        userId: auth.idUsuario
    });

    useEffect(() => {
        if(auth.token === '' && auth.auth === false){
            Navigate("/login", { replace: true });
        }
        inputFile();
    }, [auth.token, auth.auth, Navigate]);

    const crearNota = async (e) =>{
        e.preventDefault();

        let formData = new FormData()
        if(image.current?.img?.data){
            formData.append('image', image.current.img.data);
        }
        formData.append('title', nota.title);
        formData.append('description', nota.description);
        formData.append('userId', nota.userId);

        try {
            const respuesta = await clienteAxios.post('/notas/add', formData,{
                headers: {
                    'Authorization' : `Bearer ${auth.token}`,
                    'Content-Type' : 'multipart/form-data'
                }
            });

            console.log('respuesta', respuesta);
            
            if(respuesta.data.errores){
            Swal.fire({
                customClass: {
                icon: 'mx-auto mt-3',
                },
                position: 'top-end',
                icon: 'error',
                title: respuesta.data.errores[0].msg,
                showConfirmButton: false,
                timer: 700,
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
                    timer: 700,
                    width: 350
                });
                Navigate("/notas", { replace: true });
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
            width: 250,
            showConfirmButton: false,
            timer: 700,
            });
        }
    }

    const inputFile = () => {
	var input = document.querySelector( '.inputfile' );
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});
    };

    const leerDatos = (e) => {
        newNota({
            ...nota,
            [e.target.name]: e.target.value
            })
    }

    const handleFileChange = (e) => {
        let selectedFile = e.target.files[0];
        const types = ['image/png', 'image/jpeg', 'image/jpg'];

        if (selectedFile && types.includes(selectedFile.type)) {
            const img = {
                preview: URL.createObjectURL(e.target.files[0]),
                data: e.target.files[0],
            }
            image.current = {img}
            setError('');
        } else {
            image.current = null;
            setError('Por favor seleccione una imagen (png, jpeg)');
        }
        
    }

  return (
    <form onSubmit={crearNota}>
        <nav className="navbar navbar-expand-lg sticky-top" id='Navbar-nota'>
            <div className="container-fluid">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item ms-2">
                        <Link className="nav-link" aria-current="page" to="/notas"><i className="fa-solid fa-arrow-left fa-lg"></i></Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item me-2">
                        <button type="submit" className="nav-link btn btn-outline border-0"><i className="fa-solid fa-check fa-lg"></i></button>
                    </li>
                </ul>
            </div>
        </nav>
        {error && <p class="alert alert-info text-center fw-semibold">{error}</p>}
        <div className='container px-0 my-5 mx-auto' id='container-agregar-notas'>
            <div className="container-input">
                <input type="file" name="image" id="file-1" className="inputfile inputfile-1" data-multiple-caption="{count} archivos seleccionados" onChange={handleFileChange} />
                <label htmlFor="file-1">
                <span className="iborrainputfile">Seleccionar imagen</span>
                </label>
            </div>
            <div className="my-3 p-0">
                <div>
                    <input type="text" required spellCheck="false" autoComplete='off' name='title' className="form-control shadow-none fw-bold" id='input-titulo' placeholder="Titulo" aria-label="Titulo" onChange={leerDatos}/>
                    <div id="contenedor">
                        <textarea rows={50} id="agregar-textarea" name='description' spellCheck="false" placeholder='Escribe algo...' className='form-control shadow-none ps-3 me-3 mb-3' contentEditable="true" autoComplete='off' onChange={leerDatos}></textarea>
                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}

export default AgregarNota