import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Realizar la solicitud GET a la API
    fetch('https://backinmoticatec2.onrender.com/primero')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }, []); // Se ejecuta solo una vez al cargar el componente

  return (
    <div>
      <h1>Consumiendo API desde React</h1>
      {data ? (
        <div>
          <p>Respuesta de la API:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default App;
