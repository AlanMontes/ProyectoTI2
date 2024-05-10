import { useEffect } from 'react';
import React from 'react';
import tec2 from "../tecderecha.svg";
import tec22 from "../tecizquierda.svg";

function Baños() {

  useEffect(() => {
    const element = document.getElementById("cont-instructions-elements");
    if (element) {
      element.style.display = 'none';
    }
  }, []); 

  function mostrarInformacion(ubicacion) {
    alert('Ha hecho clic en: ' + ubicacion);
  }

  function hideInstructions(){
    if(document.getElementById("cont-instructions-elements").style.display === "none"){
        document.getElementById("cont-instructions-elements").style.display = '';
    }else{
        document.getElementById("cont-instructions-elements").style.display = 'none';
    }
  }


  return (
    
    <div className='baños-container'>
      <div className='content-titles-baños'>
        <h2 style={{fontSize:"2.5vw", marginTop:"1%", marginBottom:".5%"}}>Calidad en los Baños</h2>
        <h3 style={{height:"20%",marginTop:"0",marginBottom:"1%"}}>Ayudanos a reportar cualquier falta de papel o jabón en cualquiera de los baños de nuestra institución</h3>
        <div className="cont-instructions">
            <div className='instructions' onClick={hideInstructions}>Ver instrucciones</div>
        </div>
        <div className="cont-instructions-elements" id="cont-instructions-elements">
            <div className='instruction'><li>Seleccionar el edifico donde se encuentra el baño a reportar</li></div>
            <div className='instruction'><li>Seleccionar el baño del edificio</li></div>
            <div className='instruction'><li>Seleccionar el genero del baño</li></div>
            <div className='instruction'><li>Seleccionar si hay falta de papel o jabón (esta opción estará deshabilitada si el baño ya esta reportado)</li></div>
        </div>
      </div>
     
      <div className="center-content">
        <div className='maps'>
          <img src={tec22} alt=" " className="header-image-es" />
          <img src={tec2} alt=" " className="header-image-es" />
        </div>
          <h3>Baño hombres edifico B seleccionado</h3>
          <button className="header-button" >Falta papel</button>
          <button className="header-button" >Falta jabón</button>
      </div>
      
      <div style={{ position: 'relative' }}>
      <img src={tec2} alt="Croquis" style={{ width: '100%', height: 'auto' }} useMap="#ubicaciones" />
      <map name="ubicaciones">
        <area shape="rect" coords="200,250,300,350" onClick={() => mostrarInformacion('Ubicación 1')} alt="Ubicación 1" />
        <area shape="circle" coords="200,200,50" onClick={() => mostrarInformacion('Ubicación 2')} alt="Ubicación 2" />
        <area shape="circle" coords="300,300,50" onClick={() => mostrarInformacion('Ubicación 3')} alt="Ubicación 3" />
        {/* Agrega más áreas según sea necesario */}
      </map>
    </div>

    </div>
  


  
  );
}

export default Baños;
