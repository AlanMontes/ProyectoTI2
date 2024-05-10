import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  function toPrincipal(){
    navigate('/Principal');
  }

  return (
    <div>
      <h2>LOGIN</h2>
      <div onClick={toPrincipal}>Iniciar Sesion</div>
    </div>
  );
}

export default Login;
