import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pendientes from './pendientes';
import Bitacora from './Bitacora';

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

  const handleClickPendientes = () => {
    setMostrarPendientes(true);
    setMostrarBitacora(false); 
  };

  const handleClickBitacora = () => {
    setMostrarPendientes(false);
    setMostrarBitacora(true);
  };

  function handleClickExit(){
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <div className='body-gen'>
      <div className="header">
              <img src="/logotec.png" alt=" " className="logotec" />
              <h1 className="title">InmotiTEC2 ADMIN</h1>
              <button className="button-baños" onClick={handleClickPendientes}>Gestión de Baños</button>
              <button className="button-estacionamiento" onClick={handleClickBitacora}>Bitacora de reportes</button>
              <button className="button-baños" onClick={handleClickExit}>Salir</button>
      </div>

      <div className="body-gen">
        {mostrarPendientes && <Pendientes />} 
        {mostrarBitacora && <Bitacora />} 

      </div>

    </div>
  );
}

export default Admin;