import axios from 'axios';
import React, { useState } from 'react';

function RegistroPacientes() {
  //Se define el estado con el hook de useState a cada componente
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [cedula, setCedula] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false); // Estado para controlar la ventana emergente

  //Validación de las entradas de los campos
  const handleNombreChange = (e) => {
    const input = e.target.value.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s]/g, ''); // Sólo letras, incluyendo "ñ" y acentos
    setNombre(input);
  };

  const handleApellidoChange = (e) => {
    const input = e.target.value.replace(/[^A-Za-zñÑáéíóúÁÉÍÓÚ\s]/g, ''); // Sólo letras, incluyendo "ñ" y acentos
    setApellido(input);
  };

  const handleFechaNacimientoChange = (e) => {
    setFechaNacimiento(e.target.value);
  };

  const handleTelefonoChange = (e) => {
    let input = e.target.value.replace(/\D/g, ''); // Sólo números
    // Limitar el número de caracteres a 11
    input = input.substring(0, 11);
    setTelefono(input);
  };

  const handleCedulaChange = (e) => {
    let input = e.target.value.replace(/\D/g, ''); // Sólo números
    // Limitar el número de caracteres a 8
    input = input.substring(0, 8);
    setCedula(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verificar si la fecha de nacimiento es mayor que la fecha actual
    const fechaNacimientoValida = new Date(fechaNacimiento) <= new Date();
    if (!fechaNacimientoValida) {
      alert("La fecha de nacimiento no puede ser mayor a la fecha actual");
      return;
    }
  
    // Verificar si el número de teléfono cumple con las condiciones requeridas
    const telefonoValido = /^(0412|0414|0416|0424)\d{7}$/g.test(telefono);
    if (!telefonoValido) {
      alert("El número telefónico debe comenzar con 0412, 0414, 0416 o 0424");
      return;
    }
  
    const data = {
      first_name: nombre,
      last_name: apellido,
      ci_number: cedula,
      mobile: telefono,
      born_date: fechaNacimiento 
    };
    try {
      await axios.post('http://localhost:3001/patients', data);
      setRegistroExitoso(true);
      setTimeout(() => {
        setRegistroExitoso(false);
      }, 3000);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };
  

  return (
    //cada input tiene su correspondiente value que está enlazado con el estado y
    // un onChange que llama a su respectivo manejador de eventos
    <div className="flex justify-center items-center h-full">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 relative">
        <h2 className="text-2xl mb-4 text-center font-bold">Registro de Pacientes</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-wrap">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                value={nombre}
                onChange={handleNombreChange}
                placeholder="Nombre"
                required
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                Apellido
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="apellido"
                type="text"
                value={apellido}
                onChange={handleApellidoChange}
                placeholder="Apellido"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaNacimiento">
              Fecha de Nacimiento
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fechaNacimiento"
              type="date"
              value={fechaNacimiento}
              onChange={handleFechaNacimientoChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
              Teléfono
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="telefono"
              type="tel"
              value={telefono}
              onChange={handleTelefonoChange}
              minLength={11}
              maxLength={11}
              placeholder="Teléfono"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cedula">
              Cédula de Identidad
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cedula"
              type="text"
              value={cedula}
              onChange={handleCedulaChange}
              minLength={7}
              maxLength={7}
              placeholder="Cédula de identidad"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Registrar
            </button>
          </div>
        </form>
        {registroExitoso && (
          <div className="fixed top-0 right-0 mt-4 mr-4 bg-green-500 text-white py-2 px-4 rounded">
            Paciente registrado correctamente
          </div>
        )}
      </div>
    </div>
  );
}

export default RegistroPacientes;
