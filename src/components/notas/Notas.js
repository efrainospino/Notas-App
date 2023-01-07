import React, {useContext, useEffect, useState} from 'react';
import './estilos-notas.css';
import Navbar from '../navbar/Navbar';
import Buscar from '../buscar/Buscar';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import clienteAxios from '../../config/axios';
import {context} from '../../context/context'

const Notas = () => {
    let Navigate = useNavigate();

    const {auth, guardarAuth, setNotas, filternotas, setFilterNotas} = useContext(context);


    useEffect(() => {

        if(auth.token !== ''){
            try {
                const consultarAPI = async () =>{
                    const notasConsulta = await clienteAxios.get(`/usuarios/${auth.idUsuario}`, {
                        headers: {
                            Authorization : `Bearer ${auth.token}`
                        }
                    }); 
                    const notes = notasConsulta.data.notes;
                    setNotas(notes);
                    setFilterNotas(notes);

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
    }, [setNotas,setFilterNotas, auth.token, auth.idUsuario, Navigate, auth, guardarAuth]);

    if(!auth.auth){
        Navigate("/login", { replace: true });
    }

  return (
    <>
        <Navbar/>
        <Buscar/>
        <div className='container mx-auto'>
            <div className='row mb-4'>
                <div className='col-md-3 col-6'>
                    <Link to="/agregarnota" className='card my-1' id='card-agregar-notas'>
                        <div className="card-body text-center">
                            <h5 className='card-title fw-bold py-3'>Agregar una nueva <br />nota.</h5>
                        </div>
                    </Link>
                </div>
                {filternotas && filternotas.map((nota) => (
                    <div className='col-md-3 col-6' key={nota?._id?._id}>
                      <Link to={`${nota?._id?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className='card my-1' id='card-notas'>
                            {
                                nota._id.image?.length > 0 ? 
                                    (<img src={`http://localhost:5001/uploads/${nota?._id?.image}`} className='card-img-top' id='imagen-card' alt={`${nota?._id?.title}`}  />) 
                                    : null
                            }
                          <div className="card-body">
                              <h5 className='card-title fw-bold'>{nota?._id?.title}</h5>
                              <p className='card-text' id='text-card'>{nota?._id?.description}</p>
                          </div>
                      </div>
                      </Link>
                    </div>
                  ) 
                )}
            </div>
        </div>
    </>
  )
}

export default Notas