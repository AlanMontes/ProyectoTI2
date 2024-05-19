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
        <div>
              <img src="/logotec.png" alt=" " className="logotec" />
        </div>
        <div>
              <h1 className="title" id="title">InmotiTEC2 ADMIN</h1>
        </div>
        <div>
              <button className="button-baños" onClick={handleClickPendientes}>Gestión de Baños</button>
        </div>
        <div>
              <button className="button-estacionamiento" onClick={handleClickBitacora}>Bitacora de reportes</button>
        </div>
        <div>
              <button className="button-salir" onClick={handleClickExit}>Salir</button>
        </div>
      </div>

      <div className="body-gen">
        {mostrarPendientes && <Pendientes />} 
        {mostrarBitacora && <Bitacora />} 

      </div>

    </div>
  );
}

export default Admin;