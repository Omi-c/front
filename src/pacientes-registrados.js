import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PacientesRegistrados() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedPatientData, setEditedPatientData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3001/patients')
      .then((res) => {
        setPatients(res.data);
      });
  }, []);

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Función para abrir el modal de edición
  const openModal = (patient) => {
    setSelectedPatient(patient);
    setEditedPatientData(patient);
    setModalOpen(true);
  };

  // Función para cerrar el modal de edición
  const closeModal = () => {
    setModalOpen(false);
  };

  // Función para actualizar los datos del paciente
  const updatePatientData = (field, newValue) => {
    setEditedPatientData({
      ...editedPatientData,
      [field]: newValue
    });
  };

  // Función para guardar los cambios realizados en el modal
  const saveChanges = () => {
    const updatedPatients = patients.map(patient => {
      if (patient.id === selectedPatient.id) {
        return { ...patient, ...editedPatientData };
      }
      return patient;
    });
    setPatients(updatedPatients);
    setModalOpen(false);
  };

  // Función para eliminar temporalmente un paciente de la lista
  const deletePatient = (id) => {
    setPatients(patients.filter(patient => patient.id !== id));
  };

  // Filtrar pacientes basado en el valor de búsqueda
  const filteredPatients = patients.filter((patient) =>
    patient.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.ci_number.includes(searchTerm)
  );

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Pacientes Registrados</h2>
      {/* Campo de búsqueda */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Buscar por nombre o cédula"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {/* Modal de edición */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Editar Paciente</h2>
            {selectedPatient && (
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={editedPatientData.first_name}
                    onChange={(e) => updatePatientData('first_name', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={editedPatientData.last_name}
                    onChange={(e) => updatePatientData('last_name', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ciNumber">
                    Cédula
                  </label>
                  <input
                    type="text"
                    id="ciNumber"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={editedPatientData.ci_number}
                    onChange={(e) => updatePatientData('ci_number', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bornDate">
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    id="bornDate"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={editedPatientData.born_date}
                    onChange={(e) => updatePatientData('born_date', e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={editedPatientData.mobile}
                    onChange={(e) => updatePatientData('mobile', e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={saveChanges}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {/* Tabla de pacientes */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-200 text-gray-700 border">Nombre</th>
            <th className="px-4 py-2 bg-gray-200 text-gray-700 border">Apellido</th>
            <th className="px-4 py-2 bg-gray-200 text-gray-700 border">Cédula</th>
            <th className="px-4 py-2 bg-gray-200 text-gray-700 border">Fecha de nacimiento</th>
            <th className="px-4 py-2 bg-gray-200 text-gray-700 border">Teléfono</th>
            <th className="px-4 py-2 bg-gray-200 text-gray-700 border">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredPatients.map((patient) => (
            <tr key={patient.id} className="hover:text-teal-600 cursor-default">
              <td className="px-4 py-2 border">{patient.first_name}</td>
              <td className="px-4 py-2 border">{patient.last_name}</td>
              <td className="px-4 py-2 border">{patient.ci_number}</td>
              <td className="px-4 py-2 border">{patient.born_date}</td>
              <td className="px-4 py-2 border">{patient.mobile}</td>
              <td className="px-4 py-2 border">
                <button onClick={() => openModal(patient)} className="text-blue-500 hover:text-blue-700 mr-2">
                  Editar
                </button>
                <button onClick={() => deletePatient(patient.id)} className="text-red-500 hover:text-red-700">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PacientesRegistrados;
