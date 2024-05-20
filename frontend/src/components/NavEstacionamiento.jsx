import React from 'react';
import xIcon from "../circle-xmark-solid.svg";
import v from "../good.svg";
import carro from "../carro.png";
import { useEffect, useState } from 'react';
const RoutesearchEstacionamiento = process.env.REACT_APP_SEARCHES_ESTACIONAMIENTO || "http://localhost:8000/searches/estacionamiento";

function NavEstacionamiento(props) {

    const [cajones, setCajones] = useState([]);
    const [numcajones, setNumcajones] = useState([]);


    useEffect(() => {    
          getcajones();
      }, [cajones]);


      const getcajones = async() =>{    
        const data = {
          idestacionamiento: "1"
        };
            try {
              const response = await fetch(`${RoutesearchEstacionamiento}`, {
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
              setCajones(responseData[0].cajones);
              const concurrencia = responseData[0].cajones.filter(item => item === 0).length;
              setNumcajones(concurrencia);
            } catch (error) {
              console.error('Error:', error);
            }
      }

    function checkImage(cajon){
        if(cajon === 1){
           return  <img src={carro} alt="" style={{width:"100%"}}/>
        }else {
           return <img src={v} alt="" style={{width:"60%"}}/>
        }
        
    }

    return (
        <nav className='div-edificio-seleccionado'>
            <div className='content-nav-edificio'>
                <div className='content-nav-tittle'>
                    <div className='nav-tittle'>
                        {props.estacionamiento}
                    </div>
                    <div className='nav-xIcon' onClick={props.closeModal}>
                        <img src={xIcon} alt="" style={{width:"60%"}}/>
                    </div>
                </div>
                <div className="nav-content-estacionamiento">
                    <div className='nav-instructions'>Lugares disponibles: {numcajones}</div>
                    <div className='cajones-content'>
                            {cajones && cajones.map((cajon, index) => (
                                <div className='cajon' key={index}> {/* Asegúrate de agregar un key único para cada elemento */}
                                    <div className='cajon-disp' key={index}>
                                        {checkImage(cajon)}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </nav>
    );
 }
 
 export default NavEstacionamiento;
