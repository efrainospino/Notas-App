import React from 'react';
import './estilos-notas.css';
import Navbar from '../navbar/Navbar';
import Buscar from '../buscar/Buscar';
import { Link } from "react-router-dom";

const Notas = () => {
  return (
    <>
        <Navbar/>
        <Buscar/>
        <div className='container mx-auto'>
            <div className='row mb-4'>
                <div className='col-md-3 col-6'>
                    <Link to="/agregarnota" className='card my-1' id='card-agregar-notas'>
                        <div className="card-body text-center">
                            <h5 className='card-title fw-bold py-5'>Agregar una nueva <br />nota.</h5>
                        </div>
                    </Link>
                </div>
                <div className='col-md-3 col-6'>
                    <div className='card my-1' id='card-notas'>
                        <img src="https://adrianacotte.com/wp-content/uploads/2021/05/hamburguesa01.jpeg" className='card-img-top' id='imagen-card' alt="imgagen" />
                        <div className="card-body">
                            <h5 className='card-title fw-bold'>Hola</h5>
                            <p className='card-text' id='text-card'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi quaerat autem eos expedita explicabo itaque.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Notas