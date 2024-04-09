import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CitasAgendadas() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/citas')
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Citas Agendadas</h2>
      <div className="mt-4">
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
                <td className="border border-gray-300 px-4 py-2 text-center">{appointment.patient?.first_name} {appointment.patient?.last_name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{formatDate(appointment.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CitasAgendadas;
