import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AgendaCitas() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/citas')
      .then((res) => {
        setPatients(res.data);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  //formulario de cita
  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    if (selectedPatient && selectedDate) {
      // Crear un nuevo objeto cita
      const newAppointment = {
        patient: selectedPatient,
        date: selectedDate
      };
      // Agregar la nueva cita al estado de citas
      setAppointments([...appointments, newAppointment]);
      setSelectedPatient('');
      setSelectedDate('');
    } else {
      alert('Por favor complete todos los campos.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Agenda de Citas</h2>
      <form onSubmit={handleAppointmentSubmit}>
        {/* Selector de paciente */}
        <div className="mb-4">
          <label htmlFor="patient" className="block text-sm font-semibold mb-2">Seleccionar Paciente:</label>
          <select id="patient" value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} className="w-full border rounded py-2 px-3">
            <option value="">Seleccionar paciente</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>{patient.first_name} {patient.last_name}</option>
            ))}
          </select>
        </div>
        {/* Selector de fecha */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-semibold mb-2">Seleccionar Fecha:</label>
          <input type="date" id="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full border rounded py-2 px-3" />
        </div>
        {/* Botón para registrar la cita */}
        <div className="flex justify-center mt-4">
          <button type="submit" className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Listo</button>
        </div>
      </form>
      {/* Tabla de citas */}
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Citas Registradas:</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Paciente</th>
              <th className="border border-gray-300 px-4 py-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
        
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{appointment.patient}</td>
                <td className="border border-gray-300 px-4 py-2">{appointment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AgendaCitas;
