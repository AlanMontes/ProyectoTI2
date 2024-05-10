import React from 'react';

function Estacionamiento() {
  return (
    <div>
      <h2>Encuentra lugar en el estacionamiento</h2>
      <h2>Estacionamientos libres: 7</h2>
      <h2>Estacionamientos ocupados: 9</h2>
      <div className="center-content">
        <img src="/estacionamiento.png" alt=" " className="header-image-es" />
        <h3>Rojo= ocupado</h3>
        <h3>Verde= libre</h3>
      </div>
      {/* Aquí puedes agregar el contenido del componente de Baños */}
    </div>
  );
}

export default Estacionamiento;
