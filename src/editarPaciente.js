import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditarPaciente() {
  // Obtenemos el parámetro de la URL (el ID del paciente a editar)
  const { id } = useParams();

  // Estado para almacenar los datos del paciente
  const [patient, setPatient] = useState({
    first_name: '',
    last_name: '',
    ci_number: '',
    born_date: '',
    mobile: ''
  });

  // Función para cargar los datos del paciente desde el servidor
  useEffect(() => {
    axios.get(`http://localhost:3001/patients/${id}`)
      .then((res) => {
        setPatient(res.data);
      })
      .catch((error) => {
        console.error('Error fetching patient data:', error);
      });
  }, [id]); // Se ejecuta cada vez que el ID del paciente cambia

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  // Función para enviar los datos actualizados del paciente al servidor
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/patients/${id}`, patient)
      .then((res) => {
        console.log('Patient updated successfully:', res.data);
        // Redireccionar a la página de pacientes registrados después de la edición
        window.location = '/pacientes-registrados';
      })
      .catch((error) => {
        console.error('Error updating patient:', error);
      });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Editar Paciente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">Nombre</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={patient.first_name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {/* Repite el mismo patrón para los demás campos del formulario */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditarPaciente;
