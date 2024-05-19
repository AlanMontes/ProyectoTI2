import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const RoutesearchLogin =  process.env.VITE_SEARCHES_LOGIN ;
console.log('RouteSearchDispestacionamiento:', RoutesearchLogin);


function Login() {
  const navigate = useNavigate();


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  function toAdmin(){
    navigate('/admin');
  }

  function toPrincipal(){
    navigate('/Principal');
  }

  async function validation(){
    const data = {
      nocontrol: username,
      pass: password
    };
        try {
          const response = await fetch(RoutesearchLogin, {
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
          localStorage.setItem('user', JSON.stringify({ idusuario: responseData.idusuario}));

          if(responseData.tipo === "admin"){
            toAdmin();  
          }else{
            toPrincipal();
          }
        } catch (error) {
          console.error('Error:', error);
        }
  }

  return (
    <div className='body-gen'>
        <div className="header" id="header-login">
                <div></div>
                <img src="/logotec.png" alt=" " className="logotec" />
                <h1 className="title">InmotiTEC2</h1>
                <div></div>
        </div>

        <div className='content-login'>
          <div className='login-title'> 
                Inicio de sesión
          </div>
          <div className='layout-login'>
              Número de control
          </div>
          
          <input type="text" className='input-login' value={username} onChange={handleUsernameChange} placeholder='Ingresa tu número de control'/>
          
          <div className='layout-login'>
              Contraseña
          </div>
          <input type="password" className='input-login' value={password}  onChange={handlePasswordChange}  placeholder="Ingresa tu contraseña de moodle"/>
          
          <div className='layout-login' id="button-login" onClick={validation}>
              Iniciar Sesión
          </div>
        
        </div>

    </div>
  );
}

export default Login;
