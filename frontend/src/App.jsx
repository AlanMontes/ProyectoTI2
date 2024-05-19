"use client";
import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from "./components/Login.jsx"
import Principal from "./components/Principal.jsx"
import Admin from './components/admin.jsx';

import './Header.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Principal" element={<Principal/>} />
        <Route path="/Admin" element={<Admin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
