import React, { useEffect, useState } from 'react';
const RoutesearchBitacoraFecha = process.env.REACT_APP_SEARCHES_BITACORAFECHA  || "http://localhost:8000/searches/bitacoraFecha";

function Bitacora() {
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
              const response = await fetch(`${RoutesearchBitacoraFecha}`, {
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
    return hora;
  }

  function changeGender(gender){
    if(gender === "male"){
      return "Hombres"
    }else{
      return "Mujeres"
    } 
  }

  function setDate(){
      setFechaSeleccionada(document.getElementById("date").value);
  }

  return (
    <div className='admin-baños-content'>
        <div  className='admin-baños-title'>Registro de los usuarios que reportaron</div>
        <div  className='admin-baños-title' id="btn-date">
        <input type="date" name="" id="date" className='input-date'/> <button className='btn-date' onClick={() =>{setDate()}}>Buscar</button>
        </div>

        <div className='admin-baños-content-reportados'>
          <div className='admin-baños-reportados'>
                <div id='admin-baños-reportados-sub'>Baño</div>
                <div id='admin-baños-reportados-sub'>Genero</div>
                <div id='admin-baños-reportados-sub'>Reporte</div>
                <div id='admin-baños-reportados-sub'>Hora</div>
                <div id='admin-baños-reportados-sub'>Estudiante</div>
          </div>
          {reportes && reportes.map((reporte, index) => (
          <div className='admin-baños-reportados' key={index}>
            
                <div id='admin-baños-reportados-sub'>{reporte.baño}</div>
                <div id='admin-baños-reportados-sub'>{changeGender(reporte.genero)}</div>
                <div id='admin-baños-reportados-sub'>{reporte.tiporegistro}</div>
                <div id='admin-baños-reportados-sub-jabon' >{changeDate(reporte.fecha_hora)}</div>
                <div id='admin-baños-reportados-sub-papel' >{reporte.numerocontrol}</div>
          </div>
        ))}
        </div>
        
    </div>
  );
}

export default Bitacora;