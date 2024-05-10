"use client";
import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from "./components/Login.jsx"
import Principal from "./components/Principal.jsx"

import './Header.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Principal" element={<Principal/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
