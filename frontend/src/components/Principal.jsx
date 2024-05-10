import React, { useState } from 'react';
import Baños from './baños';
import Estacionamiento from './estacionamiento';

function Inicio() {
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

  return (
    <div className='body-gen'>
      <div className="header">
              <img src="/logotec.png" alt=" " className="logotec" />
              <h1 className="title">InmotiTEC2</h1>
              <button className="button-baños" onClick={handleClickBaños}>Gestión de Baños</button>
              <button className="button-estacionamiento" onClick={handleClickEstacionamiento}>Estacionamientos disponibles</button>
      </div>

      <div className="body-container">
        {mostrarBaños && <Baños />} 
        {mostrarEstacionamiento && <Estacionamiento />} 
      </div>

    </div>
  );
}

export default Inicio;