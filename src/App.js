import React, { useState } from 'react';
import loginImg from './Assets/laboratorio.jpg';
import Sidebar from './sidebar';
import VistaMedico from './vista-medico.js'; // Importa el componente VistaMedico

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    // Verifica si las credenciales son correctas
    if (usuario === 'medico' && contraseña === 'laboratorio') {
      setIsLoggedIn(true);
      setTipoUsuario('medico'); // Establece el tipo de usuario
    } else if (usuario === 'trabajador' && contraseña === 'admin') {
      setIsLoggedIn(true);
      setTipoUsuario('trabajador'); // Establece el tipo de usuario
    } else {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className='h-screen w-full'>
      {!isLoggedIn ? (
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className='hidden sm:block'>
            <img className='w-full h-screen object-cover' src={loginImg} alt='' />
          </div>

          <div className='bg-blue-100 flex flex-col justify-center'>
            <form onSubmit={handleLogin} className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg'>
              <h2 className='text-4xl text-white font-bold text-center text-3xl mb-7'>Inicio de Sesión</h2>
              <div className='flex flex-col text-gray-400 py-2'>
                <label>Usuario</label>
                <input 
                  name='usuario' 
                  value={usuario} 
                  onChange={(e) => setUsuario(e.target.value)} 
                  className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
                  type='text' 
                />
              </div>
              <div className='flex flex-col text-gray-400 py-2'>
                <label>Contraseña</label>
                <input 
                  name='contraseña' 
                  value={contraseña} 
                  onChange={(e) => setContraseña(e.target.value)} 
                  className=' p-2 rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' 
                  type='password' 
                />
              </div>
              <button type='submit' className='w-full my-5 py-4 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Ingresar</button>
            </form>
          </div>
        </div>
      ) : (
        // Muestra el componente adecuado dependiendo del tipo de usuario
        tipoUsuario === 'medico' ? <VistaMedico /> : <Sidebar />
      )}
    </div>
  );
}
