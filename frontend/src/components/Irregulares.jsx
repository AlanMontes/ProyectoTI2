import React, { useEffect, useState } from 'react';
const Routesearchirregulares= process.env.REACT_APP_SEARCHES_BITACORAIRREGULARES || "http://localhost:8000/searches/bitacoraIrregulares";


function Irregulares() {
  const [reportesIrregulares, setReportesIrregulares] = useState([]);

  useEffect(() => {
      fetchreportesirregulares();
  }, [reportesIrregulares]);


  const fetchreportesirregulares = async () => {
    let fechaActual = new Date();
    fechaActual = fechaActual.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
      const data = {
        "date": fechaActual
      };
      try {
        const response = await fetch(`${Routesearchirregulares}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          throw new Error('Hubo un problema al obtener los datos');
        }
        const responseData = await response.json();
        setReportesIrregulares(responseData);

      } catch (error) {
        console.error('Error:', error);
      }
  };

      
  return (            
                        <div className='admin-baños-content'>
                              <div  className='admin-baños-title'>Reportes irregulares del día</div>
                              <div className='reportes-irregulares-ins'>
                                  <p>Estos reportes son irregulares, ya que se reportó más de 3 veces en el día el mismo baño y el mismo insumo.</p>
                                  <p>Posibles razones:</p>
                                  <ul>
                                    <li>El intendente encargado no está surtiendo verdaderamente el insumo.</li>
                                    <li>Un alumno está levantando constantemente falsos reportes sobre ese baño, para molestar al intendente.</li>
                                    <li>El baño tiene una alta cotización del insumo y su abasto no es suficiente.</li>
                                  </ul>
                              </div>
                              <div className='admin-baños-content-reportados'>
                                  <div className='admin-baños-reportados' id="admin-baños-reportados-irregulares">
                                        
                                        <div id='admin-baños-reportados-sub'>Baño</div>
                                        <div id='admin-baños-reportados-sub'>Genero</div>
                                        <div id='admin-baños-reportados-sub'>Insumo reportado</div>
                                        
                                  </div>
                                    {Object.entries(reportesIrregulares).map(([clave, valor]) => {
                                      // Parsear la clave y extraer la parte deseada
                                      const partesClave = JSON.parse(clave);
                                      const baño = partesClave[0];
                                      const genero = partesClave[1];
                                      const insumo = partesClave[2];

                                      return (
                                        <div className='admin-baños-reportados' id="admin-baños-reportados-irregulares" key={clave}>                                          
                                          <div id='admin-baños-reportados-sub'>{baño}</div>
                                          <div id='admin-baños-reportados-sub'>{genero}</div>
                                          <div id='admin-baños-reportados-sub'>{insumo}</div>
                                        </div>
                                      );
                                    })}
                                  
                              </div>
                              
                        </div>
    
  );
}

export default Irregulares;