import React, { useState } from 'react';
import axios from 'axios';

function RegistroInventario() {
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar que los campos no estén vacíos
    if (!producto || !cantidad) {
      alert('Debe seleccionar un producto y especificar una cantidad.');
      return;
    }

    // Validar que la cantidad no sea menor que 1
    if (parseInt(cantidad) < 1) {
      alert('La cantidad debe ser mayor o igual que 1.');
      return;
    }

    const data = {
      name: producto,
      quantity: cantidad
    };

    axios.post('http://localhost:3001/inventary', data)
      .then(() => {
        setRegistroExitoso(true);
        setTimeout(() => {
          setRegistroExitoso(false);
        }, 3000);
        setProducto('');
        setCantidad('');
      })
      .catch((error) => {
        console.error('Error al enviar los datos del inventario:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Registro de Inventario</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="producto" className="block mb-1">Producto</label>
          <select
            id="producto"
            className="block w-full px-4 py-2 border rounded focus:outline-none"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
          >
            <option value="">Selecciona un producto o reactivo</option>
            <option value="Bilirrubina total">Bilirrubina total</option>
            <option value="Tiras de orina">Tiras de orina</option>
            <option value="Tiras de embarazo">Tiras de embarazo</option>
            <option value="PCR">PCR</option>
            <option value="Alcohol">Alcohol</option>
            <option value="Agua oxigenada">Agua oxigenada</option>
            <option value="Lancetas">Lancetas</option>
            <option value="Inyectadoras">Inyectadoras</option>
            <option value="Creatinina">Creatinina</option>
            <option value="Gasas">Gasas</option>
            <option value="Bilirrubina directa">Bilirrubina directa</option>
            <option value="Diluyente">Diluyente</option>
            <option value="Colesterol">Colesterol</option>
            <option value="Reactivo de COVID">Reactivo de COVID</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="cantidad" className="block mb-1">Cantidad (unidades)</label>
          <input
            type="number"
            id="cantidad"
            className="block w-full px-4 py-2 border rounded focus:outline-none"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Registrar</button>
        </div>
      </form>
      {registroExitoso && (
        <div className="fixed top-0 right-0 mt-4 mr-4 bg-green-500 text-white py-2 px-4 rounded">
          Inventario registrado correctamente
        </div>
      )}
    </div>
  );
}

export default RegistroInventario;
