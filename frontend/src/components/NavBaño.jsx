import React from 'react';
import xIcon from "../circle-xmark-solid.svg";
import male  from "../person-solid.svg"
import female  from "../person-dress-solid.svg"
import { useState } from 'react';
import { useEffect } from 'react';
const RoutesearchReporte = process.env.VITE_SEARCHES_REPORTE || "http://localhost:8000/searches/reporte";
const RoutechangeReporte = process.env.VITE_CHANGES_REPORTE || "http://localhost:8000/changes/reporte";


function NavBaño(props) {

    const [gender, setGender] = useState(false);
    const [idbañoH, setIdBañoH] = useState(false);
    const [idbañoM, setIdBañoM] = useState(false);
    
    let bañoHombres = null
    let bañoMujeres = null

    useEffect(() => {
        const element = document.getElementById("btn");
        if (element) {
          element.style.display = 'none';
        }

        checkRegistros();
      }, [idbañoH,idbañoM]); 

    function checkemale(){
        setGender("Baño hombres")
        document.getElementById("male").style.backgroundColor="rgba(0, 0, 255, 0.650)"
        document.getElementById("female").style.backgroundColor="rgba(0, 0, 0, 0.6500)"
        document.getElementById("btn").style.display = ""
        document.getElementById("btnjabon").style.display = ""
        document.getElementById("btnpapel").style.display = ""
        document.getElementById("btnjabon2").style.display = "none"
        document.getElementById("btnpapel2").style.display = "none"
    }

    function checkedfemale(){
        setGender("Baño mujeres")
        document.getElementById("female").style.backgroundColor="rgba(255, 192, 203, 0.65)"
        document.getElementById("male").style.backgroundColor="rgba(0, 0, 0, 0.6500)"
        document.getElementById("btn").style.display = ""
        document.getElementById("btnjabon2").style.display = ""
        document.getElementById("btnpapel2").style.display = ""
        document.getElementById("btnjabon").style.display = "none"
        document.getElementById("btnpapel").style.display = "none"
        
    }

    async function checkRegistros(){
        let edificio = props.edificio
        if(edificio === "ADMINISTRATIVOS"){
           edificio = "ADMIN1"
        }else if(edificio === "BIBLIOTECA"){
            edificio = "BIBLIO1"
        }else if(edificio === "POSGRADOS"){
            edificio = "POS1"
        }else{
            edificio = edificio+1;
        }
        
        const data = {
          baño: (edificio)
        };
            try {
              const response = await fetch(`${RoutesearchReporte}`, {
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
              if(responseData[0].genero === "female"){
                bañoHombres = responseData[1];
                bañoMujeres = responseData[0];

                setIdBañoH(bañoHombres.id_baño);
                setIdBañoM(bañoMujeres.id_baño);
              }else{
                bañoHombres = responseData[0];
                bañoMujeres = responseData[1];
                setIdBañoH(bañoHombres.id_baño);
                setIdBañoM(bañoMujeres.id_baño);
              }
              

              if(bañoHombres.papel === 0){            
                document.getElementById("btnpapel").disabled = true;
              }

              if(bañoHombres.jabon === 0){
                document.getElementById("btnjabon").disabled = true;
              }

              if(bañoMujeres.papel === 0){
                document.getElementById("btnpapel2").disabled = true;
              }

              if(bañoMujeres.jabon === 0){
                document.getElementById("btnjabon2").disabled = true;
              }



            } catch (error) {
              console.error('Error:', error);
            }
      }


   async function reporteBaño(tiporeporte){
        let edificio = props.edificio
        let idbaño;
        if(edificio === "ADMINISTRATIVOS"){
           edificio = "ADMIN1"
        }else if(edificio === "BIBLIOTECA"){
            edificio = "BIBLIO1"
        }else if(edificio === "POSGRADOS"){
            edificio = "POS1"
        }else{
            edificio = edificio+1;
        }

        let genero
        if(gender === "Baño hombres"){
            genero = "male"
            idbaño = idbañoH;
        }else{
            genero = "female"
            idbaño = idbañoM;
        }

        let id = JSON.parse(localStorage.getItem('user'));
        const data = {
            idbaño: idbaño,
            baño: edificio,
            genero: genero,
            tiporeporte: tiporeporte,
            idusuario: id.idusuario
          };
          try {
            const response = await fetch(`${RoutechangeReporte}`, {
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
            checkRegistros();
          } catch (error) {
            console.error('Error:', error);
          }

    }



  return (
    <nav className='div-edificio-seleccionado'>
        <div className='content-nav-edificio'>
            <div className='content-nav-tittle'>
                <div className='nav-tittle'>
                    Edificio {props.edificio} seleccionado
                </div>
                <div className='nav-xIcon'>
                        <img src={xIcon} alt="" style={{width:"60%"}} onClick={() => props.navbaño(props.edificio)}/>
                </div>
            </div>
            <div className='content-nav-body'>
                <div className='nav-instructions'>Selecciona el género del baño </div>
                <div className='nav-genders'>
                    <div className='male' id="male" onClick={checkemale}>
                        <img src={male} alt="" style={{width:"50%"}}/>
                    </div>
                    <div className='female' id="female" onClick={checkedfemale}>
                        <img src={female} alt=""style={{width:"50%"}} />
                    </div>
                </div>
                <div className='nav-selection'>Género seleccionado: <br />{gender}</div>
                <div className='nav-buttons' id="btn" >
                    <button className='nav-button' style={{marginLeft:"40%"}} onClick={() => reporteBaño("papel")}   id="btnpapel">Reportar falta de papel</button>
                    <button className='nav-button' style={{marginRight:"40%"}} onClick={() => reporteBaño("jabon")}  id="btnjabon">Reportar falta de jabón</button>
                    <button className='nav-button' style={{marginLeft:"40%"}} onClick={() => reporteBaño("papel")}   id="btnpapel2">Reportar falta de papel</button>
                    <button className='nav-button' style={{marginRight:"40%"}} onClick={() => reporteBaño("jabon")}  id="btnjabon2">Reportar falta de jabón</button>
                </div>
            </div>
        </div>
    </nav>
  );
}

export default NavBaño;
