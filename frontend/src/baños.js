import React from 'react';

function Baños() {
  return (
    <div>
      <h2>Calidad en los Baños</h2>
      <h3>Reporta cualquier falta de papel o jabón en cualquiera de los baños de nuestra institución</h3>
      {/* Aquí puedes agregar el contenido del componente de Baños */}
      <div className="center-content">
        <img src="/baños.png" alt=" " className="header-image-es" />
        <h3>Baño hombres edifico B seleccionado</h3>
        <button className="header-button" >Falta papel</button>
        <button className="header-button" >Falta jabón</button>
      </div>
    </div>
  );
}

export default Baños;
