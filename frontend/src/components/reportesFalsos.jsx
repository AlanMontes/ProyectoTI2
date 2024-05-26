import React, { useEffect, useState } from 'react';
const Routesearchreportesfalsos = process.env.REACT_APP_SEARCHES_BUSCARFALSOS  || "http://localhost:8000/searches/buscarfalsos";



function ReportesFalsos() {
  var state = null;
  const [reportes, setReportes] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(state);

   useEffect(() => {

      const intervalId = setInterval(() => {
        if (fechaSeleccionada) {
          fetchreportes();
          state = [];
      }
      }, 500);
  
      return () => clearInterval(intervalId);

  }, [fechaSeleccionada]);

  const fetchreportes = async () => {
            const data = {
              date: fechaSeleccionada
            };
            try {
              const response = await fetch(`${Routesearchreportesfalsos}`, {
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
              setReportes(responseData);
              if(responseData.length === 0){
                  alert("No se encontraron registros");
                  setFechaSeleccionada(null);
              }
            } catch (error) {
              console.error('Error:', error);
            }
  };

  function changeDate(date){
    var fecha_hora_objeto = new Date(date);
    var fecha = fecha_hora_objeto.toISOString().slice(0, 10);
    var hora = fecha_hora_objeto.toTimeString().slice(0, 8);
    // var fecha_hora_formateada = fecha + " " + hora;
    return fecha;
  }


  function setDate(){
      setFechaSeleccionada(document.getElementById("date").value);
  }

  return (
    <div className='admin-baños-content'>
        <div  className='admin-baños-title'>Registro de los usuarios que realizaron falsos reportes</div>
        <div  className='admin-baños-title' id="btn-date">
        <input type="date" name="" id="date" className='input-date'/> <button className='btn-date' onClick={() =>{setDate()}}>Buscar</button>
        </div>

        <div className='admin-baños-content-reportados'>
          <div className='admin-baños-reportados' id="falsos-columnas">
                <div id='admin-baños-reportados-sub'>Fecha</div>
                <div id='admin-baños-reportados-sub'>Numero de control</div>
          </div>
          {reportes && reportes.map((reporte, index) => (
          <div className='admin-baños-reportados' key={index} id="falsos-columnas">
                <div id='admin-baños-reportados-sub'>{changeDate(reporte.fecha_hora)}</div>
                <div id='admin-baños-reportados-sub'>{reporte.numerocontrol}</div>
          </div>
        ))}
        </div>
        
    </div>
  );
}

export default ReportesFalsos;