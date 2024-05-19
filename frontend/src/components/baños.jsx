import { useEffect } from 'react';
import { useState } from 'react';
import React from 'react';
import tec2 from "../tecderecha.svg";
import tec22 from "../tecizquierda.svg";
import NavBaño from './NavBaño';


function Baños() {

  
  const [ edificioSeleccionado, setedificioSeleccionado] = useState(false);
  const [navBañoEdificio, setShowNavBaño] = useState(false);


  const navbaño = (edificio) => {
    setedificioSeleccionado(edificio);
    setShowNavBaño(!navBañoEdificio);
  };

  useEffect(() => {
    const element = document.getElementById("cont-instructions-elements");
    if (element) {
      element.style.display = 'none';
    }
  }, []); 



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
            <h3 style={{height:"20%",marginTop:"0",marginBottom:"1%", fontSize:"1.5vw"}}>Ayudanos a reportar cualquier falta de papel o jabón en cualquiera de los baños de nuestra institución</h3>
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
                <div style={{ position: 'relative' }}>
                    <img src={tec22} alt=" " className="image-map" />
                    <div className="EM" title="EM" onClick={() => navbaño("M")}></div>
                    <div className="EO" title="EO" onClick={() => navbaño("O")}></div>
                    <div className="ET" title="ET" onClick={() => navbaño("T")}></div>
                    <div className="POS" title="POS" onClick={() => navbaño("POSGRADOS")}></div>
                </div>  
        
                <div style={{ position: 'relative' }}>
                    <img src={tec2} alt=" " className="image-map" />
                    <div className="ES" title="S" onClick={() => navbaño("S")}></div>
                    <div className="biblioteca" title="biblioteca" onClick={() => navbaño("BIBLIOTECA")}></div>
                    <div className="EF" title="EF" onClick={() => navbaño("F")}></div>
                    <div className="EB" title="EB" onClick={() => navbaño("B")}></div>
                    <div className="ED" title="ED" onClick={() => navbaño("D")}></div>
                    <div className="EP" title="EP" onClick={() => navbaño("P")}></div>
                    <div className="EG" title="EG" onClick={() => navbaño("G")}></div>
                    <div className="GYM" title="GYM" onClick={() => navbaño("GYM")}></div>
                    <div className="ADMI" title="ADMI" onClick={() => navbaño("ADMINISTRATIVOS")}></div>
                </div>
            </div>
            {navBañoEdificio && <NavBaño closeModal={navbaño}  edificio={edificioSeleccionado} navbaño={navbaño}/>}
          </div>
    </div>
  


  
  );
}

export default Baños;
