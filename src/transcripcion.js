import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf'; // biblioteca para generar PDF
import { Telegraf } from 'telegraf';

function Transcripcion() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedTests, setSelectedTests] = useState([]);
  const [template, setTemplate] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad de la ventana emergente
  
  // Obtener la lista de pacientes registrados
  useEffect(() => {
    axios.get('http://localhost:3001/patients')
      .then((res) => {
        setPatients(res.data);
      });
  }, []);

  // Manejar cambios en la selección del paciente
  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value);
  };

  // Manejar cambios en la selección de los exámenes
  const handleTestToggle = (name) => {
    if (selectedTests.includes(name)) {
      setSelectedTests(selectedTests.filter(test => test !== name));
    } else {
      setSelectedTests([...selectedTests, name]);
    }
  };

  // Plantillas de los exámenes
  const generateTemplate = (selectedTests) => {
    let template = '';
    selectedTests.forEach(test => {
      switch (test) {
        case 'Prueba de HIV':
        case 'VDRL':
        case 'Antidoping':
        case 'Prueba de COVID':
        case 'Urocultivo':
        case 'Prueba de Embarazo':
        case 'Dengue':
        case 'Hepatitis B':
        case 'Exudado Faringeo':
          template += `
            <div class="mb-6 text-center"> <!-- Añadir margen inferior entre exámenes -->
            <h1 class="text-2xl font-bold mb-4">${test}</h1>
              <p>Paciente: ${selectedPatient}</p>
              <p>Fecha: ${new Date().toLocaleDateString()}</p> <!-- Mostrar la fecha actual -->
              <!-- Agregar datos del paciente -->
              <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
              <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
              <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
              <p>Fecha de Nacimiento: ${patients.find(patient => patient.id === parseInt(selectedPatient)).born_date}</p>
              <p>Estado: <select><option value="positivo">Positivo</option><option value="negativo">Negativo</option></select></p>
            </div>
            <hr class="my-4"> <!-- Añadir línea de separación entre exámenes -->
          `;
          break;
        case 'Enzimas Cardiacas':
          template += `
            <div class="mb-6 text-center"> <!-- Añadir margen inferior entre exámenes -->
              <h1 class="text-2xl font-bold mb-4">${test}</h1> 
              <p>Paciente: ${selectedPatient}</p>
              <p>Fecha: ${new Date().toLocaleDateString()}</p> <!-- Mostrar la fecha actual -->
              <!-- Agregar datos del paciente -->
              <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
              <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
              <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
              <p>Fecha de Nacimiento: ${patients.find(patient => patient.id === parseInt(selectedPatient)).born_date}</p>
              ${test === 'Enzimas Cardiacas' ? `
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="CPK" class="block text-sm font-semibold mb-2">CPK (UI/L)</label>
                  <input type="text" id="CK" name="CK" placeholder="" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2 "> 
                </div>
                <div>
                  <label for="CKMB" class="block text-sm font-semibold mb-2">CKMB (UI/L)</label>
                  <input type="text" id="CKMH" name="CKMH" placeholder="" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2 "> 
                </div>
                <div>
                  <label for="Troponina" class="block text-sm font-semibold mb-2">TROPONINA (UI/L)</label>
                  <input type="text" id="Troponina" name="Troponina" placeholder="" pattern="[0-9]*">
                </div>
              </div>
              ` : ''}
            </div>
            <hr class="my-4"> <!-- Añadir línea de separación entre exámenes -->
          `;
        break;
        case 'Grupo Sanguíneo':
          template += `
            <div class="mb-6 text-center"> <!-- Añadir margen inferior entre exámenes y centrar elementos -->
              <h1 class="text-2xl font-bold mb-4">${test}</h1> <!-- Cambiar a h1, negrita y más grande -->
              <p>Paciente: ${selectedPatient}</p>
              <p>Fecha: ${new Date().toLocaleDateString()}</p> <!-- Mostrar la fecha actual -->
              <!-- Agregar datos del paciente -->
              <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
              <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
              <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
              <p>Fecha de Nacimiento: ${patients.find(patient => patient.id === parseInt(selectedPatient)).born_date}</p>
              ${test === 'Grupo Sanguíneo' ? `
              <div class="grid grid-cols-2 gap-4"> 
                <label for="grupoSanguineo" class="block text-sm font-semibold mb-2">Grupo sanguíneo:</label>
                <select id="grupoSanguineo" name="grupoSanguineo" className="border rounded py-1 px-2 mb-2 "> 
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="O">O</option>
                  <option value="OB">OB</option>
                </select>
              </div>
              ` : ''}
            </div>
            <hr class="my-4"> <!-- Añadir línea de separación entre exámenes -->
          `;
          break;
        case 'Hematología':
            template += `
              <div class="mb-6 text-center"> <!-- Añadir margen inferior entre exámenes y centrar elementos -->
                <h1 class="text-2xl font-bold mb-4">${test}</h1> <!-- Cambiar a h1, negrita y más grande -->
                <p>Paciente: ${selectedPatient}</p>
                <p>Fecha: ${new Date().toLocaleDateString()}</p> <!-- Mostrar la fecha actual -->
                <!-- Agregar datos del paciente -->
                <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
                <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
                <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
                <p>Fecha de Nacimiento: ${patients.find(patient => patient.id === parseInt(selectedPatient)).born_date}</p>
                ${test === 'Hematología' ? `
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="Hemoglobina" class="block text-sm font-semibold mb-2">Hemoglobina</label>
                    <input type="text" id="Hemoglobina" name="Hemoglobina" placeholder="" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                  </div>
                  <div>
                    <label for="Hematocritos" class="block text-sm font-semibold mb-2">Hematocritos</label>
                    <input type="text" id="Hematocritos" name="Hematocritos" placeholder="" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                  </div>
                  <div>
                    <label for="CHCM" class="block text-sm font-semibold mb-2">CHCM</label>
                    <input type="text" id="CHCM" name="CHCM" placeholder="" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2"> <!-- Cambiar color de fondo a gris claro -->
                  </div>
                  <div>
                    <label for="GlobulosBlancos" class="block text-sm font-semibold mb-2">Glóbulos blancos</label>
                    <input type="text" id="GlobulosBlancos" name="GlobulosBlancos" placeholder="" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2"> 
                  </div>
                  <div>
                    <label for="Plaquetas" class="block text-sm font-semibold mb-2">Plaquetas</label>
                    <input type="text" id="Plaquetas" name="Plaquetas" placeholder="" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2 "> <!-- Cambiar color de fondo a gris claro -->
                  </div>
                  <div>
                    <label for="Neotrofilos" class="block text-sm font-semibold mb-2">Neotrofilos</label>
                    <input type="text" id="Neotrofilos" name="Neotrofilos" placeholder="%" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2"> <!-- Cambiar color de fondo a gris claro -->
                  </div>
                  <div>
                    <label for="Linfocitos" class="block text-sm font-semibold mb-2">Linfocitos</label>
                    <input type="text" id="Linfocitos" name="Linfocitos" placeholder="%" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2"> <!-- Cambiar color de fondo a gris claro -->
                  </div>
                  <div>
                    <label for="Monocitos" class="block text-sm font-semibold mb-2">Monocitos</label>
                    <input type="text" id="Monocitos" name="Monocitos" placeholder="%" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2"> <!-- Cambiar color de fondo a gris claro -->
                  </div>
                  <div>
                    <label for="Eosinofilos" class="block text-sm font-semibold mb-2">Eosinofilos</label>
                    <input type="text" id="Eosinofilos" name="Eosinofilos" placeholder="%" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2"> <!-- Cambiar color de fondo a gris claro -->
                  </div>
                  <div>
                    <label for="Basofilos" class="block text-sm font-semibold mb-2">Basofilos</label>
                    <input type="text" id="Basofilos" name="Basofilos" placeholder="%" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2 "> <!-- Cambiar color de fondo a gris claro -->
                  </div>
                </div>
                ` : ''}
              </div>
              <hr class="my-4"> <!-- Añadir línea de separación entre exámenes -->
            `;
            break;
        case 'Prueba de Orina':
              template += `
                <div class="mb-6 text-center"> <!-- Añadir margen inferior entre exámenes y centrar elementos -->
                  <h1 class="text-2xl font-bold mb-4">${test}</h1> <!-- Cambiar a h1, negrita y más grande -->
                  <p>Paciente: ${selectedPatient}</p>
                  <p>Fecha: ${new Date().toLocaleDateString()}</p> <!-- Mostrar la fecha actual -->
                  <!-- Agregar datos del paciente -->
                  <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
                  <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
                  <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
                  <p>Fecha de Nacimiento: ${patients.find(patient => patient.id === parseInt(selectedPatient)).born_date}</p>
                  ${test === 'Prueba de Orina' ? `
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label for="Color" class="block text-sm font-semibold mb-2">Color</label>
                      <input type="text" id="Color" name="Color" placeholder="" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                    </div>
                    <div>
                      <label for="Proteinas" class="block text-sm font-semibold mb-2">Proteinas</label>
                      <input type="text" id="Proteinas" name="Proteinas" placeholder="" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                    </div>
                    <div>
                      <label for="Glucosa" class="block text-sm font-semibold mb-2">Glucosa</label>
                      <input type="text" id="Glucosa" name="Glucosa" placeholder="" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                    </div>
                    <div>
                      <label for="Hemoglobina" class="block text-sm font-semibold mb-2">Hemoglobina</label>
                      <input type="text" id="Hemoglobina" name="Hemoglobina" placeholder="" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                    </div>
                    <div>
                      <label for="PH" class="block text-sm font-semibold mb-2">PH</label>
                      <input type="text" id="PH" name="PH" placeholder="" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                    </div>
                    <div>
                      <label for="Hematies" class="block text-sm font-semibold mb-2">Hematies</label>
                      <input type="text" id="Hematies" name="Hematies" placeholder="XC" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                    </div>
                    <div>
                      <label for="Densidad" class="block text-sm font-semibold mb-2">Densidad</label>
                      <input type="text" id="Densidad" name="Densidad" placeholder="" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                    </div>
                    <div>
                      <label for="Cantidad" class="block text-sm font-semibold mb-2">Cantidad</label>
                      <input type="text" id="Cantidad" name="Cantidad" placeholder="CC" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                    </div>
                    <div>
                      <label for="Nitritos" class="block text-sm font-semibold mb-2">Nitritos</label>
                      <select id="Nitritos" name="Nitritos" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                        <option value="Positivo">Positivo</option>
                        <option value="Negativo">Negativo</option>
                      </select>
                    </div>
                    <div>
                      <label for="Bilirrubina" class="block text-sm font-semibold mb-2">Bilirrubina</label>
                      <select id="Bilirrubina" name="Bilirrubina" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                        <option value="Positivo">Positivo</option>
                        <option value="Negativo">Negativo</option>
                      </select>
                    </div>
                    <div>
                      <label for="Urobilina" class="block text-sm font-semibold mb-2">Urobilina</label>
                      <select id="Urobilina" name="Urobilina" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                        <option value="Positivo">Positivo</option>
                        <option value="Negativo">Negativo</option>
                      </select>
                    </div>
                    <div>
                      <label for="PigBili" class="block text-sm font-semibold mb-2">Pig. Bili</label>
                      <select id="PigBili" name="PigBili" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                        <option value="Positivo">Positivo</option>
                        <option value="Negativo">Negativo</option>
                      </select>
                    </div>
                    <div>
                      <label for="Cetona" class="block text-sm font-semibold mb-2">Cetona</label>
                      <select id="Cetona" name="Cetona" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                        <option value="Positivo">Positivo</option>
                        <option value="Negativo">Negativo</option>
                      </select>
                    </div>
                    <div>
                      <label for="Cristales" class="block text-sm font-semibold mb-2">Cristales</label>
                      <select id="Cristales" name="Cristales" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                        <option value="Moderados">Moderados</option>
                        <option value="Abundantes">Abundantes</option>
                        <option value="Escasos">Escasos</option>
                      </select>
                    </div>
                    <div>
                      <label for="Bacterias" class="block text-sm font-semibold mb-2">Bacterias</label>
                      <select id="Bacterias" name="Bacterias" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                        <option value="Moderados">Moderados</option>
                        <option value="Abundantes">Abundantes</option>
                        <option value="Escasos">Escasos</option>
                      </select>
                    </div>
                    <div>
                      <label for="Mucina" class="block text-sm font-semibold mb-2">Mucina</label>
                      <select id="Mucina" name="Mucina" className="border rounded py-1 px-2 mb-2 bg-gray-200"> <!-- Cambiar color de fondo a gris claro -->
                        <option value="Moderados">Moderados</option>
                        <option value="Abundantes">Abundantes</option>
                        <option value="Escasos">Escasos</option>
                      </select>
                    </div>
                  </div>
                  ` : ''}
                </div>
                <hr class="my-4"> <!-- Añadir línea de separación entre exámenes -->
              `;
              break;
        case 'Prueba de Heces':
                template += `
                  <div class="mb-6 text-center"> <!-- Añadir margen inferior entre exámenes y centrar elementos -->
                    <h1 class="text-2xl font-bold mb-4">${test}</h1> <!-- Cambiar a h1, negrita y más grande -->
                    <p>Paciente: ${selectedPatient}</p>
                    <p>Fecha: ${new Date().toLocaleDateString()}</p> <!-- Mostrar la fecha actual -->
                    <!-- Agregar datos del paciente -->
                    <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
                    <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
                    <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
                    <p>Fecha de Nacimiento: ${patients.find(patient => patient.id === parseInt(selectedPatient)).born_date}</p>
                    ${test === 'Prueba de Heces' ? `
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label for="ColorHeces" class="block text-sm font-semibold mb-2">Color</label>
                        <input type="text" id="ColorHeces" name="ColorHeces" placeholder="" className="border rounded py-1 px-2 mb-2"> 
                      </div>
                      <div>
                        <label for="OlorHeces" class="block text-sm font-semibold mb-2">Olor</label>
                        <input type="text" id="OlorHeces" name="OlorHeces" placeholder="" className="border rounded py-1 px-2 mb-2"> 
                      </div>
                      <div>
                        <label for="AspectoHeces" class="block text-sm font-semibold mb-2">Aspecto</label>
                        <input type="text" id="AspectoHeces" name="AspectoHeces" placeholder="" className="border rounded py-1 px-2 mb-2">
                      </div>
                      <div>
                        <label for="ConsistenciaHeces" class="block text-sm font-semibold mb-2">Consistencia</label>
                        <input type="text" id="ConsistenciaHeces" name="ConsistenciaHeces" placeholder="" className="border rounded py-1 px-2 mb-2"> 
                      </div>
                      <div>
                        <label for="ReaccionHeces" class="block text-sm font-semibold mb-2">Reacción</label>
                        <input type="text" id="ReaccionHeces" name="ReaccionHeces" placeholder="" className="border rounded py-1 px-2 mb-2"> 
                      </div>
                      <div>
                        <label for="SangreHeces" class="block text-sm font-semibold mb-2">Sangre</label>
                        <select id="SangreHeces" name="SangreHeces" className="border rounded py-1 px-2 mb-2"> 
                          <option value="Ausente">Ausente</option>
                          <option value="Escasos">Escasos</option>
                          <option value="Abundantes">Abundantes</option>
                        </select>
                      </div>
                      <div>
                        <label for="MocoHeces" class="block text-sm font-semibold mb-2">Moco</label>
                        <select id="MocoHeces" name="MocoHeces" className="border rounded py-1 px-2 mb-2"> 
                          <option value="Ausente">Ausente</option>
                          <option value="Escasos">Escasos</option>
                          <option value="Abundantes">Abundantes</option>
                        </select>
                      </div>
                      <div>
                        <label for="DetritosHeces" class="block text-sm font-semibold mb-2">Detritos</label>
                        <select id="DetritosHeces" name="DetritosHeces" className="border rounded py-1 px-2 mb-2">
                          <option value="Ausente">Ausente</option>
                          <option value="Escasos">Escasos</option>
                          <option value="Abundantes">Abundantes</option>
                        </select>
                      </div>
                    </div>
                    ` : ''}
                  </div>
                  <hr class="my-4"> <!-- Añadir línea de separación entre exámenes -->
                `;
                break;
        case 'VSG':
          template += `
            <div class="mb-6 text-center"> <!-- Añadir margen inferior entre exámenes y centrar elementos -->
              <h1 class="text-2xl font-bold mb-4">${test}</h1>
              <p>Paciente: ${selectedPatient}</p>
              <p>Fecha: ${new Date().toLocaleDateString()}</p> <!-- Mostrar la fecha actual -->
              <!-- Agregar datos del paciente -->
              <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
              <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
              <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
              <p>Fecha de Nacimiento: ${patients.find(patient => patient.id === parseInt(selectedPatient)).born_date}</p>
              ${test === 'VSG' ? `
              <div class="flex justify-center"> <!-- Contenedor para centrar horizontalmente -->
                <div class="w-full md:w-1/2"> <!-- Establecer el ancho máximo para evitar que el campo sea demasiado ancho -->
                  <label for="Eritrosedimentacion" class="block text-sm font-semibold mb-2">Eritrosedimentación</label>
                  <input type="text" id="Eritrosedimentacion" name="Eritrosedimentacion" placeholder="mm/1h" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2">
                  <p class="text-sm">Valor de referencia: 0-10 mm/1 hora</p>
                </div>
              </div>
              ` : ''}
            </div>
            <hr class="my-4"> <!-- Añadir línea de separación entre exámenes -->
          `;
        break;
        case 'PCR':
          template += `
            <div class="mb-6 text-center"> <!-- Añadir margen inferior entre exámenes y centrar elementos -->
              <h1 class="text-2xl font-bold mb-4">${test}</h1>
              <p>Paciente: ${selectedPatient}</p>
              <p>Fecha: ${new Date().toLocaleDateString()}</p> <!-- Mostrar la fecha actual -->
              <!-- Agregar datos del paciente -->
              <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
              <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
              <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
              <p>Fecha de Nacimiento: ${patients.find(patient => patient.id === parseInt(selectedPatient)).born_date}</p>
              ${test === 'PCR' ? `
              <div class="flex justify-center items-center flex-col">
                <div class="w-full md:w-1/2">
                  <label for="PCR" class="block text-sm font-semibold mb-2">PCR</label>
                  <input type="text" id="PCR" name="PCR" placeholder="" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2">
                  <p class="text-sm">Valor de referencia: Hasta 6,0 mg/L</p>
                </div>
              </div>
              ` : ''}
            </div>
            <hr class="my-4"> <!-- Añadir línea de separación entre exámenes -->
          `;
        break;
        case 'PT, PTT':
          template += `
            <div class="mb-6 text-center"> <!-- Añadir margen inferior entre exámenes y centrar elementos -->
              <h1 class="text-2xl font-bold mb-4">${test}</h1>
              <p>Paciente: ${selectedPatient}</p>
              <p>Fecha: ${new Date().toLocaleDateString()}</p> <!-- Mostrar la fecha actual -->
              <!-- Agregar datos del paciente -->
              <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
              <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
              <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
              <p>Fecha de Nacimiento: ${patients.find(patient => patient.id === parseInt(selectedPatient)).born_date}</p>
              ${test === 'PT, PTT' ? `
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="PT" class="block text-sm font-semibold mb-2">PT</label>
                  <input type="text" id="PT" name="PT" placeholder="" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2">
                </div>
                <div>
                  <label for="PTT" class="block text-sm font-semibold mb-2">PTT</label>
                  <input type="text" id="PTT" name="PTT" placeholder="" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2">
                </div>
              </div>
              ` : ''}
            </div>
            <hr class="my-4"> <!-- Añadir línea de separación entre exámenes -->
          `;
          break;
        case 'Química Sanguínea':
            template += `
              <div class="mb-6 text-center"> <!-- Añadir margen inferior entre exámenes y centrar elementos -->
                <h1 class="text-2xl font-bold mb-4">${test}</h1> <!-- Cambiar a h1, negrita y más grande -->
                <p>Paciente: ${selectedPatient}</p>
                <p>Fecha: ${new Date().toLocaleDateString()}</p> <!-- Mostrar la fecha actual -->
                <!-- Agregar datos del paciente -->
                <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
                <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
                <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
                <p>Fecha de Nacimiento: ${patients.find(patient => patient.id === parseInt(selectedPatient)).born_date}</p>
                ${test === 'Química Sanguínea' ? `
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="Glucosa" class="block text-sm font-semibold mb-2">Glucosa</label>
                    <input type="text" id="Glucosa" name="Glucosa" placeholder="mg/dL" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2">
                    <p class="text-sm">VR: 74.0 - 106.0</p>
                  </div>
                  <div>
                    <label for="Colesterol" class="block text-sm font-semibold mb-2">Colesterol</label>
                    <input type="text" id="Colesterol" name="Colesterol" placeholder="mg/dL" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2">
                    <p class="text-sm">VR: <= 200.0</p>
                  </div>
                  <div>
                    <label for="Creatinina" class="block text-sm font-semibold mb-2">Creatinina</label>
                    <input type="text" id="Creatinina" name="Creatinina" placeholder="mg/dL" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2">
                    <p class="text-sm">VR: 0.50 - 0.90</p>
                  </div>
                  <div>
                    <label for="Urea" class="block text-sm font-semibold mb-2">Urea</label>
                    <input type="text" id="Urea" name="Urea" placeholder="mg/dL" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2">
                    <p class="text-sm">VR: 16.6 - 48.5</p>
                  </div>
                  <div>
                    <label for="Trigliceridos" class="block text-sm font-semibold mb-2">Trigliceridos</label>
                    <input type="text" id="Trigliceridos" name="Trigliceridos" placeholder="mg/dL" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2">
                    <p class="text-sm">VR: <= 150.0</p>
                  </div>
                  <div>
                    <label for="Bilirrubina" class="block text-sm font-semibold mb-2">Bilirrubina</label>
                    <input type="text" id="Bilirrubina" name="Bilirrubina" placeholder="mg/dL" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2">
                    <p class="text-sm">VR: <= 1.20</p>
                  </div>
                </div>
                ` : ''}
              </div>
              <hr class="my-4"> <!-- Añadir línea de separación entre exámenes -->
            `;
          break;
        default:
          break;
      }
    });
    setTemplate(template);
  };
  
  // Función para cerrar la ventana emergente
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    generateTemplate(selectedTests);
    setShowModal(true);
  };
  
  const handleSend = async () => {
    try {
      const doc = new jsPDF();
      let yOffset = 10;
  
      // Agregar contenido de la plantilla al PDF
      doc.setFontSize(12);
      doc.text(template, 10, yOffset);
      yOffset += 10;
  
      // Agregar información de los exámenes al PDF
      selectedTests.forEach((test, index) => {
        const examData = `Examen ${index + 1}: ${test}`;
        doc.text(examData, 10, yOffset);
        yOffset += 10;
        // Agregar información adicional aquí, por ejemplo, datos del paciente, fecha, etc.
      });
  
      // Guardar el PDF con el nombre 'examenes.pdf'
      doc.save('examenes.pdf');
      const bot = new Telegraf('5811027492:AAEacM9yDDTr56eGMp9WAb4loWCYTzMBjfs');
      const chatId = 1147360782; // Reemplaza esto con el chatId real
      const message = 'Hola desde el front!';
      bot.telegram.sendMessage(chatId, message);
  
      // Cerrar la ventana emergente después de enviar el PDF
      setShowModal(false);
  
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  
  

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Transcripción de Resultados</h2>
      <form onSubmit={handleSubmit}>
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
        {/* Selector de exámenes */}
        <div className="mb-4">
          <label htmlFor="tests" className="block text-sm font-semibold mb-2">Seleccionar Exámenes:</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Prueba de HIV', 'Enzimas Cardiacas', 'Prueba de Embarazo', 'Urocultivo', 'Antidoping', 'Dengue', 'VDRL', 'Prueba de COVID', 'Grupo Sanguíneo', 'Hematología', 'Prueba de Orina', 'Prueba de Heces', 'PT, PTT', 'Exudado Faringeo', 'PCR', 'Hepatitis B', 'VSG', 'Química Sanguínea' ].map(test => (
              <label key={test} className="inline-flex items-center">
                <input type="checkbox" onChange={() => handleTestToggle(test)} checked={selectedTests.includes(test)} className="form-checkbox h-5 w-5 text-teal-600" />
                <span className="ml-2 text-sm">{test}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Botón de siguiente */}
        <div className="flex justify-center">
          <button type="submit" className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Siguiente</button>
        </div>
      </form>
      {/* Ventana emergente */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center overflow-x-hidden bg-gray-800 bg-opacity-50">
          <div className="bg-emerald-100 p-8 rounded shadow-md max-w-xl overflow-y-auto max-h-full">
             {/* Botón para cerrar la ventana emergente */}
            <button onClick={handleCloseModal} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none">Cerrar</button>
            <div dangerouslySetInnerHTML={{ __html: template }} />
            {images.map((imageUrl, index) => (
              <div key={index} className="mb-4">
                <img src={imageUrl} alt={`Examen ${index + 1}`} />
              </div>
            ))}
             {/* Botón "Enviar" */}
             <div className="flex justify-center mt-4">
               <button onClick={handleSend} className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Enviar</button>
              </div>

          </div>
        </div>
      )}
    </div>
  );
}
export default Transcripcion;
