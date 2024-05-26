import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pendientes from './pendientes';
import Bitacora from './Bitacora';
import Irregulares from './Irregulares';
import ReportesFalsos from './reportesFalsos';

function Admin() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user === null) {
      alert("Debes iniciar sesión");
      navigate('/');
    }
  }, []);

  const [mostrarPendientes, setMostrarPendientes] = useState(false);
  const [mostrarBitacora, setMostrarBitacora] = useState(false);
  const [mostrarIrregulares, setMostrarIrregulares] = useState(false);
  const [mostrarFalsos, setMostrarFalsos] = useState(false);

  const handleClickPendientes = () => {
    setMostrarPendientes(true);
    setMostrarBitacora(false); 
    setMostrarIrregulares(false); 
    setMostrarFalsos(false); 
  };

  const handleClickIrregulares = () => {
    setMostrarPendientes(false);
    setMostrarBitacora(false); 
    setMostrarIrregulares(true); 
    setMostrarFalsos(false); 
  };

  const handleClickBitacora = () => {
    setMostrarPendientes(false);
    setMostrarBitacora(true);
    setMostrarIrregulares(false); 
    setMostrarFalsos(false); 
  };

  const handleClickFalsos = () => {
    setMostrarPendientes(false);
    setMostrarBitacora(false);
    setMostrarIrregulares(false); 
    setMostrarFalsos(true); 
  };

  function handleClickExit(){
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <div className='body-gen'>
      <div className="header" id="header-admin">
        <div>
              <img src="/logotec.png" alt=" " className="logotec" />
        </div>
        <div>
              <h1 className="title" id="title">InmotiTEC2 ADMIN </h1>
        </div>
        <div>
              <button className="button-baños" onClick={handleClickPendientes}>Gestión de Baños</button>
        </div>
        <div>
              <button className="button-baños" onClick={handleClickIrregulares}>Reportes irregulares</button>
        </div>
        <div>
              <button className="button-baños" onClick={handleClickBitacora}>Bitacora de reportes</button>
        </div>
        <div>
              <button className="button-baños" onClick={handleClickFalsos}>Bitacora de falsos reportes</button>
        </div>
        
        <div>
              <button className="button-salir" onClick={handleClickExit}>Salir</button>
        </div>
      </div>

      <div className="body-gen">
        {mostrarPendientes && <Pendientes />} 
        {mostrarBitacora && <Bitacora />} 
        {mostrarIrregulares && <Irregulares />} 
        {mostrarFalsos && <ReportesFalsos />} 

      </div>

    </div>
  );
}

export default Admin;