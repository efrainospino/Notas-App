import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import Notas from './components/notas/Notas';
import AgregarNota from './components/agregar-nota/AgregarNota';
import Tareas from './components/tareas/Tareas';
import Login from './components/login/Login';
import Registro from './components/login/Registro';
import NotaDellate from './components/notaDetalle/notaDetalle';

import {ContextProvider} from './context/context';

function App() {
  return (
    <>
      <ContextProvider>
        <Routes>
          <Route path="/notas" element={<Notas />} />
          <Route path="/notas/:noteId" element={<NotaDellate />} />
          <Route path="/agregarnota" element={<AgregarNota />} />
          <Route path="/tareas" element={<Tareas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="*" element={<Navigate to='/login' />} />
        </Routes>
      </ContextProvider>
    </>
  );
}

export default App;
