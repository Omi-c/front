import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RegistroPacientes() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [labResults, setLabResults] = useState([]);

  // Obtener la lista de pacientes registrados
  useEffect(() => {
    axios.get('http://localhost:3001/patients')
      .then((res) => {
        setPatients(res.data);
      });
  }, [labResults]);

  // Manejar cambios en la selección del paciente
  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value);
    // Obtener los resultados de laboratorio del paciente seleccionado
    axios.get(`http://localhost:3001/lab?patientId=${e.target.value}`)
      .then((res) => {
        setLabResults(res.data);
      })
      .catch((error) => {
        console.error('Error fetching lab results:', error);
      });
  };


  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Resultados de Pacientes</h2>
      <form>
        {/* Selector de paciente */}
        <div className="mb-4">
          <label htmlFor="patient" className="block text-sm font-semibold mb-2">Seleccionar Paciente:</label>
          <select id="patient" onChange={handlePatientChange} value={selectedPatient} className="w-full border rounded py-2 px-3">
            <option value="">Seleccionar paciente</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>{patient.first_name} {patient.last_name}</option>
            ))}
          </select>
        </div>
      </form>
      {/* Resultados de laboratorio */}
      <div className="mt-4">
      <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Documento del examen</th>
            </tr>
          </thead>
          <tbody>
            {labResults.map((result) => (
              <tr key={result.id}>
                <td>{result.id}</td>
                <td>
                  <a href={`http://localhost:3001/${result.path}`} target="_blank" rel="noopener noreferrer">
                    Ver examen
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Botón para ver resultados de laboratorio */}
      <div className="flex justify-center mt-4">
        <button type="submit" className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Ver resultados de laboratorio</button>
      </div>
    </div>
  );
}

export default RegistroPacientes;
