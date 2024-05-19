import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import tec22 from '../Estacionamientoizquierda.svg';
import tec2 from '../Estacionamientoderecha.svg';
import NavEstacionamiento from './NavEstacionamiento';


function Estacionamiento() {


  const [ estacionamientoSeleccionado, setestacionamientoSeleccionado] = useState(false);
  const [navEstacionamiento, setShowEstacionamiento] = useState(false);
  const [disponibilidad, setDisponibilidad] = useState([]);
  
  useEffect(() => {
    const element = document.getElementById("cont-instructions-elements");
    if (element) {
      element.style.display = 'none';
    }

    const intervalId = setInterval(() => {
      checkDisponibilidad();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);


  const checkDisponibilidad = async() =>{    
    const data = {
      idestacionamiento: "1"
    };
        try {
          const response = await fetch("http://localhost:8000/searches/dispestacionamiento", {
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
          setDisponibilidad(responseData);
        } catch (error) {
          console.error('Error:', error);
        }
  }



  const navEsta = (estacionamiento) => {
    setestacionamientoSeleccionado(estacionamiento);
    setShowEstacionamiento(!navEstacionamiento);
  };
  
  function hideInstructions(){
    if(document.getElementById("cont-instructions-elements").style.display === "none"){
        document.getElementById("cont-instructions-elements").style.display = '';
    }else{
        document.getElementById("cont-instructions-elements").style.display = 'none';
    }
  }

  function checkDispStyle(){
      if(disponibilidad === true){
         return "rgba(0, 255, 0, 0.527)";
      }else if(disponibilidad === false){
         return "rgba(255, 0, 0, 0.226)";
      }else{
         return "black";
      }
  }


  return (
    <div className='baños-container'>
          <div className='content-titles-baños'>
            <h2 style={{fontSize:"2.5vw", marginTop:"1%", marginBottom:".5%"}}>Estacionamientos</h2>
            <h3 style={{height:"20%",marginTop:"0",marginBottom:"1%", fontSize:"1.5vw"}}>Identifica los cajones libres en los distintos estacionamientos del instituto</h3>
            <div className="cont-instructions">
                <div className='instructions' onClick={hideInstructions}>Ver instrucciones</div>
            </div>
            <div className="cont-instructions-elements" id="cont-instructions-elements">
                <div className='instruction'><li>Seleccionar el estacionamiento (estacionamientos con lugares apareceran, "verdes" y sin lugar, "rojos")</li></div>
                <div className='instruction'><li>Se abrira el estacionamiento seleccionado (cajones con lugares apareceran, "verdes" y sin lugar, "rojos")</li></div>
            </div>
          </div>
        
          <div className="center-content">
            <div className='maps'>
                <div style={{ position: 'relative' }}>
                    <img src={tec22} alt=" " className="image-map" />
                </div>  
        
                <div style={{ position: 'relative' }}>
                    <img src={tec2} alt=" " className="image-map" />
                    <div className="Alumnos1" title="Alumnos1" onClick={() => navEsta("Estacionamiento Alumnos 1")} style={{ background: checkDispStyle()}}></div>
                </div>
            </div>
            {navEstacionamiento && <NavEstacionamiento closeModal={navEsta}  estacionamiento={estacionamientoSeleccionado} navEsta={navEsta}/>}
          </div>
    </div>
  );
}

export default Estacionamiento;
