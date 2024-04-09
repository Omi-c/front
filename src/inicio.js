import React from 'react';
import logo from './Assets/logo.png';

function Inicio() {
  return (
    <div className='h-full flex flex-col items-center mt-20 cursor-default'>
      <img src={logo} alt="Logo" className="w-52 h-52 mb-4" /> 
      <h1 className='text-5xl hover:text-teal-600'>Laboratorio Clínico Loma Linda Carreño</h1>
    </div>
  );
}

export default Inicio;
