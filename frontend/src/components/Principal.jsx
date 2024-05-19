import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Baños from './baños';
import Estacionamiento from './estacionamiento';

function Inicio() {
 
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user === null) {
      alert("Debes iniciar sesión");
      navigate('/');
    }
  }, []);

  const [mostrarBaños, setMostrarBaños] = useState(false);
  const [mostrarEstacionamiento, setMostrarEstacionamiento] = useState(false);

  const handleClickBaños = () => {
    setMostrarBaños(true);
    setMostrarEstacionamiento(false); 
  };

  const handleClickEstacionamiento = () => {
    setMostrarEstacionamiento(true);
    setMostrarBaños(false);
  };

  const navigate = useNavigate();
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
              <h1 className="title"  id="title">InmotiTEC2</h1>
        </div>
        <div>
              <button className="button-baños" onClick={handleClickBaños}>Gestión de Baños</button>
        </div>
        <div>
         <button className="button-estacionamiento" onClick={handleClickEstacionamiento}>Estacionamientos disponibles</button>
         </div>
         <div>
        <button className="button-salir" onClick={handleClickExit}>Salir</button>
          </div> 
      </div>

      <div className="body-container">
        {mostrarBaños && <Baños />} 
        {mostrarEstacionamiento && <Estacionamiento />} 
      </div>

    </div>
  );
}

export default Inicio;