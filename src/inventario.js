import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchIcon } from '@heroicons/react/solid';

function Inventario() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventario, setInventario] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/inventary')
      .then((res) => {
        setInventario(res.data);
      })
      .catch((error) => {
        console.error('Error al obtener el inventario:', error);
      });
  }, []);

  const filteredInventario = inventario.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-around items-center mb-4 pl-96">
        <h2 className="text-3xl font-bold">Inventario</h2>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar producto..."
            className="px-4 py-2 border rounded-l-md focus:outline-none"
          />
          <div className="absolute right-0 top-0 bottom-0 flex items-center px-2 bg-gray-200 rounded-r-md">
            <SearchIcon className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto mx-auto w-10/12">
          <thead>
            <tr>
              <th className="px-4 py-2">Producto</th>
              <th className="px-4 py-2">Existencias</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventario.map((producto, index) => (
              <tr key={index} className="hover:text-teal-600 cursor-default">
                <td className="border px-4 py-2 text-center ">{producto.nombre}</td>
                <td className="border px-4 py-2 text-center">
                  {producto.existencias === 1 ? `${producto.existencias} unidad` : `${producto.existencias} unidades`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventario;
