import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Inicio from './inicio.js';
import PacientesRegistrados from './pacientes-registrados.js';
import ResultadosPacientes from './resultados-pacientes.js';
import ListaPrecios from './lista-precios.js';
import { HomeIcon, MailIcon, UserAddIcon, UsersIcon, CurrencyDollarIcon, MenuIcon, ArchiveIcon, ClipboardCopyIcon, PencilAltIcon, LogoutIcon } from '@heroicons/react/outline';

function VistaMedico() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Recargar la página para cerrar sesión
    window.location.reload();
  };
  


  return (
    <Router>
      <div className="flex min-h-screen">
        <div className="bg-teal-600" style={{ width: sidebarOpen ? '20%' : '4rem', transition: 'width 0.3s' }}>
          <div className="p-4">
            <button onClick={toggleSidebar} className="text-white">
              <MenuIcon className="h-6 w-6 text-white cursor-pointer" />
            </button>
          </div>
          <ul className="list-none pl-6">
            {sidebarOpen && (
              <>
                <li>
                  <div className="flex items-center hover:bg-teal-500">
                    <HomeIcon className="h-5 w-5 mr-2 text-white" />
                    <Link to="/" className="py-2 px-4 text-white">Inicio</Link>
                  </div>
                </li>

                <li>
                  <div className="flex items-center hover:bg-teal-500">
                    <UsersIcon className="h-5 w-5 mr-2 text-white" />
                    <Link to="/pacientes-registrados" className="py-2 px-4 text-white">Pacientes Registrados</Link>
                  </div>
                </li>

                <li>
                  <div className="flex items-center hover:bg-teal-500">
                    <UsersIcon className="h-5 w-5 mr-2 text-white" />
                    <Link to="/resultados-pacientes" className="py-2 px-4 text-white">Resultados de Pacientes</Link>
                  </div>
                </li>

                <li>
                  <div className="flex items-center hover:bg-teal-500">
                    <CurrencyDollarIcon className="h-5 w-5 mr-2 text-white" />
                    <Link to="/lista-precios" className="py-2 px-4 text-white">Lista de Precios</Link>
                  </div>
                </li>

                <li>
                  <div className="flex items-center hover:bg-teal-500" onClick={handleLogout}>
                    <LogoutIcon className="h-5 w-5 mr-2 text-white" />
                    <span className="py-2 px-4 text-white cursor-pointer">Cerrar Sesión</span>
                  </div>
                </li>

              </>
            )}
          </ul>
        </div>

        <div className="flex flex-col flex-1">
          <div className="p-4">
            <button onClick={toggleSidebar} className="text-white">
              <MenuIcon className={`h-6 w-6 text-white cursor-pointer ${!sidebarOpen && 'absolute top-4 left-4'}`} />
            </button>
          </div>
          <div className="p-4 flex-1">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/pacientes-registrados" element={<PacientesRegistrados />} />
              <Route path="/lista-precios" element={<ListaPrecios />} />
              <Route path="/resultados-pacientes" element={<ResultadosPacientes />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default VistaMedico;
