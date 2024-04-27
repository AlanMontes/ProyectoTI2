import React, { useState } from 'react';
import Baños from './baños'; // Importa el componente de Baños
import Estacionamiento from './estacionamiento'; // Importa el componente de Estacionamiento
import './Header.css';

function App() {
  const [mostrarBaños, setMostrarBaños] = useState(false);
  const [mostrarEstacionamiento, setMostrarEstacionamiento] = useState(false);

  const handleClickBaños = () => {
    setMostrarBaños(true);
    setMostrarEstacionamiento(false); // Asegúrate de ocultar el otro componente al mostrar Baños
  };

  const handleClickEstacionamiento = () => {
    setMostrarEstacionamiento(true);
    setMostrarBaños(false); // Asegúrate de ocultar el otro componente al mostrar Estacionamiento
  };

  return (
    <div>
      <header className="header-container">
        <div className="header-content">
          <img src="/logotec.png" alt=" " className="header-image" />
          <h1 className="header-title">InmotiTEC2</h1>
          <button className="header-button" onClick={handleClickBaños}>Baños</button>
          <button className="header-button" onClick={handleClickEstacionamiento}>Estacionamiento Tec2</button>
        </div>
      </header>
      <div className="body-container">
        {mostrarBaños && <Baños />} {/* Muestra el componente de Baños si mostrarBaños es true */}
        {mostrarEstacionamiento && <Estacionamiento />} {/* Muestra el componente de Estacionamiento si mostrarEstacionamiento es true */}
      </div>
    </div>
  );
}

export default App;
