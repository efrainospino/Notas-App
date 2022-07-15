import React from 'react';
import './estilos-tareas.css';
import Swal from 'sweetalert2';
import Navbar from '../navbar/Navbar';
import Buscar from '../buscar/Buscar';

const Tareas = () => {

    

    const handleInput = () =>{
        const Swalbutton = Swal.mixin({
            customClass: {
              icon: 'mx-auto mt-5',
              confirmButton: 'btn btn-alert-confirm mx-1 mt-3',
              cancelButton: 'btn btn-alert-cancel mx-1 mt-3',
              input: 'input-alert shadow-none mx-3 mt-3'
            },
            buttonsStyling: false
          })

        Swalbutton.fire({
            title: 'Ingresa tu tarea',
            width: 450,
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off',
                spellcheck: 'false'
            },
            showCancelButton: true,
            confirmButtonText: 'Guardar',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swalbutton.fire({
                icon: 'success',
                title: 'Guardado!',
              })
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
                <div className="d-flex align-items-center col-md-6 col-12">
                    <input className="form-check-input mt-0 shadow-none align-baseline me-1" type="checkbox" value="" id="flexCheckDefault"/>
                    <div className='card my-1 align-baseline' id='card-tareas'>
                        <div className="card-body py-0">
                            <h5 className='card-title fw-bold mb-0 align-middle' id='text-card-tareas'>Agregar una nueva nota.</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Tareas