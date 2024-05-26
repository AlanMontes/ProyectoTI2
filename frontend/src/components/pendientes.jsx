import React, { useEffect, useState } from 'react';
const RoutesearchPendientes = process.env.REACT_APP_SEARCHES_PENDIENTES || "http://localhost:8000/searches/pendientes";
const RoutechangesSurtido = process.env.REACT_APP_CHANGES_SURTIR || "http://localhost:8000/changes/surtido";
const Routesearchfalsoreporte = process.env.REACT_APP_SEARCHES_FALSOREPORTE || "http://localhost:8000/searches/FalsoReporte";


function Pendientes() {

  const [reportes, setReportes] = useState([]);

  useEffect(() => {
      fetchreportes();
  }, [reportes]);

  const fetchreportes = async () => {
    try {
      const response = await fetch(`${RoutesearchPendientes}`);
      if (!response.ok) {
        throw new Error('Hubo un problema al obtener los datos');
      }
      const responseData = await response.json();
      setReportes(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };


      function changeGender(gender){
        if(gender === "male"){
          return "Hombres"
        }else{
          return "Mujeres"
        } 
      }


        function checkReportStyle(report){
            if(report === 0){
              return 'red'
          }else{
              return 'green'
          }
        }

        function checkReportValue(report){
          if(report === 0){
            return 'Faltante reportado'
        }else{
            return 'Surtido'
        }
      }

      async function notificarSurtido(reporte,tipo, id){
          if(reporte === 1){
            
          }else{

          const data = {
            id_baño: id,
            tiporeporte: tipo
          };
              try {
                const response = await fetch(`${RoutechangesSurtido}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
                });
      
                if (!response.ok) {
                  const responseData = await response.json();
                  alert(responseData.message); 
                  throw new Error('Error al realizar la solicitud');
                }
                const responseData = await response.json();
                alert(responseData.message);
              } catch (error) {
                console.error('Error:', error);
              }
            }
      }

      async function notificarFalso(reporte, baño, genero, tiporeporte, id_baño){
          if(reporte === 1){
            
          }else{
            let fechaActual = new Date();
            fechaActual = fechaActual.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
          const data = {
            date: fechaActual,
            baño: baño,
            genero: genero,
            reporte: tiporeporte
          };
              try {
                const response = await fetch(`${Routesearchfalsoreporte}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
                });
      
                if (!response.ok) {
                  const responseData = await response.json();
                  alert(responseData.message); 
                  throw new Error('Error al realizar la solicitud');
                }
                const responseData = await response.json();
                alert(responseData.message);
                notificarSurtido(reporte, tiporeporte,id_baño)
              } catch (error) {
                console.error('Error:', error);
              }
            }
      }

      
  return (
        <div className='admin-baños-content'>
              <div  className='admin-baños-title'>Baños reportados <br />pendientes de atención</div>
              <div className='admin-baños-content-reportados'>
                <div className='admin-baños-reportados'>
                      <div id='admin-baños-reportados-sub'>Edificio</div>
                      <div id='admin-baños-reportados-sub'>Baño</div>
                      <div id='admin-baños-reportados-sub'>Genero</div>
                      <div id='admin-baños-reportados-sub'>Jabón</div>
                      <div id='admin-baños-reportados-sub'>Papel</div>
                </div>
                {reportes && reportes.map((reporte, index) => (
                 <div className='admin-baños-reportados' key={index}>
                      <div id='admin-baños-reportados-sub'>{reporte.edificio}</div>
                      <div id='admin-baños-reportados-sub'>{reporte.baño}</div>
                      <div id='admin-baños-reportados-sub'>{changeGender(reporte.genero)}</div>
                      <div id='admin-baños-reportados-sub-jabon' onClick={() => notificarSurtido( reporte.jabon , "jabon", reporte.id_baño)} style={{ color: checkReportStyle(reporte.jabon)}} >{checkReportValue(reporte.jabon)}</div>
                      <div id='admin-baños-reportados-sub-papel' onClick={() => notificarSurtido( reporte.papel, "papel", reporte.id_baño)} style={{ color: checkReportStyle(reporte.papel)}} >{checkReportValue(reporte.papel)}</div>
                      <br />
                      <br />
                      <br />
                      <div id='admin-baños-reportados-sub'></div>
                      <div id='admin-baños-reportados-sub'></div>
                      <div id='admin-baños-reportados-sub-jabon' onClick={() => notificarFalso( reporte.jabon , reporte.baño, reporte.genero,"jabon", reporte.id_baño)} style={{ color: 'orange'}}> Falso reporte jabon </div>
                      <div id='admin-baños-reportados-sub-papel' onClick={() => notificarFalso( reporte.papel , reporte.baño, reporte.genero,"papel", reporte.id_baño)}  style={{ color: 'orange'}}> Falso reporte papel </div>
                </div>
              ))}
              </div>
              
        </div>

  );
}

export default Pendientes;