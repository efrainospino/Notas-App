import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import Notas from './components/notas/Notas';
import AgregarNota from './components/agregar-nota/AgregarNota';
import Tareas from './components/tareas/Tareas';
import Login from './components/login/Login';
import Registro from './components/login/Registro';


function App() {
  return (
    <>
      <Routes>
        <Route path="/notas" element={<Notas />} />
        <Route path="/agregarnota" element={<AgregarNota />} />
        <Route path="/tareas" element={<Tareas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<Navigate to='/notas' />} />
      </Routes>
    </>
  );
}

export default App;
