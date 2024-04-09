import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf'; // biblioteca para generar PDF
import logo from './Assets/logo.png'; 

function Transcripcion() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedTests, setSelectedTests] = useState([]);
  const [template, setTemplate] = useState('');
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

   //  membrete 
   const generarMembrete = (doc) => {
    const imgData = logo; 
    const imgWidth = 50; 
    const imgHeight = 50; 

    doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

    const membrete = "Laboratorio Clínico Loma Linda Carreño\nVenezuela, Edo. Carabobo. Guacara, Negro Primero";
    doc.setFontSize(12);
    doc.text(membrete, 70, 35);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

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
            <div class="mb-6"> 
            <h1 class="text-2xl font-bold mb-4 text-center">${test}</h1>
              <p>Paciente: ${selectedPatient}</p>
              <p>Fecha: ${new Date().toLocaleDateString()}</p> 
              <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
              <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
              <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
              <p>Fecha de Nacimiento: ${formatDate(patients.find(patient => patient.id === parseInt(selectedPatient)).born_date)}</p>
              <div class="mt-6"> 
              <p>Estado: <select><option value="positivo">Positivo</option><option value="negativo">Negativo</option></select></p>
            </div>
            <hr class="my-4"> 
          `;
          break;
        case 'Enzimas Cardiacas':
          template += `
            <div class="mb-6"> 
              <h1 class="text-2xl font-bold mb-4 text-center">${test}</h1> 
              <p>Paciente: ${selectedPatient}</p>
              <p>Fecha: ${new Date().toLocaleDateString()}</p>
              
              <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
              <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
              <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
              <p>Fecha de Nacimiento: ${formatDate(patients.find(patient => patient.id === parseInt(selectedPatient)).born_date)}</p>
              ${test === 'Enzimas Cardiacas' ? `
              <div class="grid grid-cols-2 gap-4 mt-6">
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
            <hr class="my-4"> 
          `;
          break;
        case 'Grupo Sanguíneo':
          template += `
            <div class="mb-6"> 
              <h1 class="text-2xl font-bold mb-4 text-center">${test}</h1> 
              <p>Paciente: ${selectedPatient}</p>
              <p>Fecha: ${new Date().toLocaleDateString()}</p> 
              
              <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
              <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
              <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
              <p>Fecha de Nacimiento: ${formatDate(patients.find(patient => patient.id === parseInt(selectedPatient)).born_date)}</p>
              ${test === 'Grupo Sanguíneo' ? `
              <div class="grid grid-cols-2 gap-4 mt-6"> 
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
            <hr class="my-4"> 
          `;
          break;
        case 'Hematología':
          template += `
              <div class="mb-6"> 
                <h1 class="text-2xl font-bold mb-4 text-center">${test}</h1> 
                <p>Paciente: ${selectedPatient}</p>
                <p>Fecha: ${new Date().toLocaleDateString()}</p> 
                
                <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
                <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
                <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
                <p>Fecha de Nacimiento: ${formatDate(patients.find(patient => patient.id === parseInt(selectedPatient)).born_date)}</p>
                ${test === 'Hematología' ? `
                <div class="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <label for="Hemoglobina" class="block text-sm font-semibold mb-2">Hemoglobina</label>
                    <input type="text" id="Hemoglobina" name="Hemoglobina" placeholder="" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                  </div>
                  <div>
                    <label for="Hematocritos" class="block text-sm font-semibold mb-2">Hematocritos</label>
                    <input type="text" id="Hematocritos" name="Hematocritos" placeholder="" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                  </div>
                  <div>
                    <label for="CHCM" class="block text-sm font-semibold mb-2">CHCM</label>
                    <input type="text" id="CHCM" name="CHCM" placeholder="" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2"> 
                  </div>
                  <div>
                    <label for="GlobulosBlancos" class="block text-sm font-semibold mb-2">Glóbulos blancos</label>
                    <input type="text" id="GlobulosBlancos" name="GlobulosBlancos" placeholder="" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2"> 
                  </div>
                  <div>
                    <label for="Plaquetas" class="block text-sm font-semibold mb-2">Plaquetas</label>
                    <input type="text" id="Plaquetas" name="Plaquetas" placeholder="" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2 "> 
                  </div>
                  <div>
                    <label for="Neotrofilos" class="block text-sm font-semibold mb-2">Neotrofilos</label>
                    <input type="text" id="Neotrofilos" name="Neotrofilos" placeholder="%" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2"> 
                  </div>
                  <div>
                    <label for="Linfocitos" class="block text-sm font-semibold mb-2">Linfocitos</label>
                    <input type="text" id="Linfocitos" name="Linfocitos" placeholder="%" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2"> 
                  </div>
                  <div>
                    <label for="Monocitos" class="block text-sm font-semibold mb-2">Monocitos</label>
                    <input type="text" id="Monocitos" name="Monocitos" placeholder="%" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2"> 
                  </div>
                  <div>
                    <label for="Eosinofilos" class="block text-sm font-semibold mb-2">Eosinofilos</label>
                    <input type="text" id="Eosinofilos" name="Eosinofilos" placeholder="%" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2"> 
                  </div>
                  <div>
                    <label for="Basofilos" class="block text-sm font-semibold mb-2">Basofilos</label>
                    <input type="text" id="Basofilos" name="Basofilos" placeholder="%" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2 "> 
                  </div>
                </div>
                ` : ''}
              </div>
              <hr class="my-4"> 
            `;
          break;
        case 'Prueba de Orina':
          template += `
                <div class="mb-6"> 
                  <h1 class="text-2xl font-bold mb-4 text-center">${test}</h1> 
                  <p>Paciente: ${selectedPatient}</p>
                  <p>Fecha: ${new Date().toLocaleDateString()}</p> 
                  
                  <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
                  <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
                  <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
                  <p>Fecha de Nacimiento: ${formatDate(patients.find(patient => patient.id === parseInt(selectedPatient)).born_date)}</p>
                  ${test === 'Prueba de Orina' ? `
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label for="Color" class="block text-sm font-semibold mb-2">Color</label>
                      <input type="text" id="Color" name="Color" placeholder="" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                    </div>
                    <div>
                      <label for="Proteinas" class="block text-sm font-semibold mb-2">Proteinas</label>
                      <input type="text" id="Proteinas" name="Proteinas" placeholder="" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                    </div>
                    <div>
                      <label for="Glucosa" class="block text-sm font-semibold mb-2">Glucosa</label>
                      <input type="text" id="Glucosa" name="Glucosa" placeholder="" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                    </div>
                    <div>
                      <label for="Hemoglobina" class="block text-sm font-semibold mb-2">Hemoglobina</label>
                      <input type="text" id="Hemoglobina" name="Hemoglobina" placeholder="" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                    </div>
                    <div>
                      <label for="PH" class="block text-sm font-semibold mb-2">PH</label>
                      <input type="text" id="PH" name="PH" placeholder="" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                    </div>
                    <div>
                      <label for="Hematies" class="block text-sm font-semibold mb-2">Hematies</label>
                      <input type="text" id="Hematies" name="Hematies" placeholder="XC" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                    </div>
                    <div>
                      <label for="Densidad" class="block text-sm font-semibold mb-2">Densidad</label>
                      <input type="text" id="Densidad" name="Densidad" placeholder="" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                    </div>
                    <div>
                      <label for="Cantidad" class="block text-sm font-semibold mb-2">Cantidad</label>
                      <input type="text" id="Cantidad" name="Cantidad" placeholder="CC" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                    </div>
                    <div>
                      <label for="Nitritos" class="block text-sm font-semibold mb-2">Nitritos</label>
                      <select id="Nitritos" name="Nitritos" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                        <option value="Positivo">Positivo</option>
                        <option value="Negativo">Negativo</option>
                      </select>
                    </div>
                    <div>
                      <label for="Bilirrubina" class="block text-sm font-semibold mb-2">Bilirrubina</label>
                      <select id="Bilirrubina" name="Bilirrubina" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                        <option value="Positivo">Positivo</option>
                        <option value="Negativo">Negativo</option>
                      </select>
                    </div>
                    <div>
                      <label for="Urobilina" class="block text-sm font-semibold mb-2">Urobilina</label>
                      <select id="Urobilina" name="Urobilina" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                        <option value="Positivo">Positivo</option>
                        <option value="Negativo">Negativo</option>
                      </select>
                    </div>
                    <div>
                      <label for="PigBili" class="block text-sm font-semibold mb-2">Pig. Bili</label>
                      <select id="PigBili" name="PigBili" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                        <option value="Positivo">Positivo</option>
                        <option value="Negativo">Negativo</option>
                      </select>
                    </div>
                    <div>
                      <label for="Cetona" class="block text-sm font-semibold mb-2">Cetona</label>
                      <select id="Cetona" name="Cetona" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                        <option value="Positivo">Positivo</option>
                        <option value="Negativo">Negativo</option>
                      </select>
                    </div>
                    <div>
                      <label for="Cristales" class="block text-sm font-semibold mb-2">Cristales</label>
                      <select id="Cristales" name="Cristales" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                        <option value="Abundantes">Abundantes</option>
                        <option value="Escasos">Escasos</option>
                      </select>
                    </div>
                    <div>
                      <label for="Bacterias" class="block text-sm font-semibold mb-2">Bacterias</label>
                      <select id="Bacterias" name="Bacterias" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                        <option value="Moderados">Moderados</option>
                        <option value="Abundantes">Abundantes</option>
                        <option value="Escasos">Escasos</option>
                      </select>
                    </div>
                    <div>
                      <label for="Mucina" class="block text-sm font-semibold mb-2">Mucina</label>
                      <select id="Mucina" name="Mucina" className="border rounded py-1 px-2 mb-2 bg-gray-200"> 
                        <option value="Moderados">Moderados</option>
                        <option value="Abundantes">Abundantes</option>
                        <option value="Escasos">Escasos</option>
                      </select>
                    </div>
                  </div>
                  ` : ''}
                </div>
                <hr class="my-4"> 
              `;
          break;
        case 'Prueba de Heces':
          template += `
                  <div class="mb-6"> 
                    <h1 class="text-2xl font-bold mb-4">${test}</h1> 
                    <p>Paciente: ${selectedPatient}</p>
                    <p>Fecha: ${new Date().toLocaleDateString()}</p> 
                    
                    <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
                    <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
                    <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
                    <p>Fecha de Nacimiento: ${formatDate(patients.find(patient => patient.id === parseInt(selectedPatient)).born_date)}</p>
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
                  <hr class="my-4">
                `;
          break;
        case 'VSG':
          template += `
            <div class="mb-6"> 
              <h1 class="text-2xl font-bold mb-4 text-center">${test}</h1>
              <p>Paciente: ${selectedPatient}</p>
              <p>Fecha: ${new Date().toLocaleDateString()}</p> 
             
              <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
              <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
              <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
              <p>Fecha de Nacimiento: ${formatDate(patients.find(patient => patient.id === parseInt(selectedPatient)).born_date)}</p>
              ${test === 'VSG' ? `
              <div class="flex mt-6"> 
                <div class="w-full md:w-1/2"> 
                  <label for="Eritrosedimentacion" class="block text-sm font-semibold mb-2">Eritrosedimentación</label>
                  <input type="text" id="Eritrosedimentacion" name="Eritrosedimentacion" placeholder="mm/1h" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2">
                  <p class="text-sm">Valor de referencia: 0-10 mm/1 hora</p>
                </div>
              </div>
              ` : ''}
            </div>
            <hr class="my-4"> 
          `;
          break;
        case 'PCR':
          template += `
            <div class="mb-6"> 
              <h1 class="text-2xl font-bold mb-4 text-center">${test}</h1>
              <p>Paciente: ${selectedPatient}</p>
              <p>Fecha: ${new Date().toLocaleDateString()}</p> 
             
              <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
              <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
              <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
              <p>Fecha de Nacimiento: ${formatDate(patients.find(patient => patient.id === parseInt(selectedPatient)).born_date)}</p>
              ${test === 'PCR' ? `
              <div class="flex flex-col mt-6">
                <div class="w-full md:w-1/2">
                  <label for="PCR" class="block text-sm font-semibold mb-2">PCR</label>
                  <input type="text" id="PCR" name="PCR" placeholder="" pattern="[0-9]*" className="border rounded py-1 px-2 mb-2">
                  <p class="text-sm">Valor de referencia: Hasta 6,0 mg/L</p>
                </div>
              </div>
              ` : ''}
            </div>
            <hr class="my-4"> 
          `;
          break;
        case 'PT, PTT':
          template += `
            <div class="mb-6"> 
              <h1 class="text-2xl font-bold mb-4 text-center">${test}</h1>
              <p>Paciente: ${selectedPatient}</p>
              <p>Fecha: ${new Date().toLocaleDateString()}</p> 
       
              <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
              <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
              <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
              <p>Fecha de Nacimiento: ${formatDate(patients.find(patient => patient.id === parseInt(selectedPatient)).born_date)}</p>
              ${test === 'PT, PTT' ? `
              <div class="grid grid-cols-2 gap-4 mt-6">
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
            <hr class="my-4"> 
          `;
          break;
        case 'Química Sanguínea':
          template += `
              <div class="mb-6"> 
                <h1 class="text-2xl font-bold mb-4 text-center">${test}</h1> 
                <p>Paciente: ${selectedPatient}</p>
                <p>Fecha: ${new Date().toLocaleDateString()}</p> 
               
                <p>Nombre: ${patients.find(patient => patient.id === parseInt(selectedPatient)).first_name}</p>
                <p>Apellido: ${patients.find(patient => patient.id === parseInt(selectedPatient)).last_name}</p>
                <p>Cédula: ${patients.find(patient => patient.id === parseInt(selectedPatient)).ci_number}</p>
                <p>Fecha de Nacimiento: ${formatDate(patients.find(patient => patient.id === parseInt(selectedPatient)).born_date)}</p>
                ${test === 'Química Sanguínea' ? `
                <div class="grid grid-cols-2 gap-4 mt-6">
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
              <hr class="my-4"> 
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

      // Añadir membrete al PDF
      generarMembrete(doc);
      yOffset += 65;
  
      // Agregar contenido de la plantilla al PDF
      doc.setFontSize(12);
      doc.text("Resultados de Análisis de Laboratorio", 10, yOffset);
      yOffset += 5;
  
      // Validar campos de texto antes de enviar
      const inputs = document.querySelectorAll('#exampleModal input[type="text"]');
      let isValid = true;
      inputs.forEach(input => {
        if (!input.value || isNaN(input.value)) {
          isValid = false;
          return;
        }
      });
  
      function validateInputs(...inputs) {
        for (const input of inputs) {
          if (!input.value || isNaN(input.value)) {
            return false;
          }
        }
        return true;
      }
  
      // Mapeo de nombres de exámenes a los identificadores de campos de entrada correspondientes
      const examInputs = {
        "Enzimas Cardiacas": ['#CK', '#CKMH', '#Troponina'], 
        "Hematología": ['#Hemoglobina', '#Hematocritos', '#CHCM', '#GlobulosBlancos', '#Plaquetas', '#Neotrofilos', '#Linfocitos', '#Monocitos', '#Eosinofilos', '#Basofilos'], 
        "Prueba de Orina": ['#Color', '#Proteinas', '#Glucosa', '#Hemoglobina', '#PH', '#Hematies', '#Densidad', '#Cantidad'],
        "Prueba de Heces": ['#ColorHeces', '#OlorHeces', '#AspectoHeces', '#ConsistenciaHeces', '#ReaccionHeces'], 
        "VSG": ['#Eritrosedimentacion'], 
        "PCR": ['#PCR'], 
        "PT, PTT": ['#PT', '#PTT'], 
        "Química Sanguínea": ['#Glucosa', '#Colesterol', '#Creatinina', '#Urea', '#Trigliceridos', '#Bilirrubina']
      };
  
      // Validación de los campos de exámenes de laboratorio
      for (const exam in examInputs) {
        if (selectedTests.includes(exam)) {
          const examFields = examInputs[exam].map(field => document.querySelector(field));
          isValid = validateInputs(...examFields);
        }
      }
      if (!isValid) {
        alert("Por favor, complete todos los campos de texto con valores numéricos.");
        return;
      }

      // Agregar información del paciente al PDF
      const selectedPatientData = patients.find(patient => patient.id === parseInt(selectedPatient));
      if (selectedPatientData) {
        yOffset += 10; // Separación entre exámenes y datos del paciente
        doc.text("Información del paciente:", 10, yOffset);
        yOffset += 7;
        doc.text(`Nombre: ${selectedPatientData.first_name}`, 10, yOffset);
        yOffset += 7;
        doc.text(`Apellido: ${selectedPatientData.last_name}`, 10, yOffset);
        yOffset += 7;
        doc.text(`Cédula: ${selectedPatientData.ci_number}`, 10, yOffset);
        yOffset += 7;
        doc.text(`Fecha de Nacimiento: ${formatDate(selectedPatientData.born_date)}`, 10, yOffset);
        yOffset += 15;
      }
  
      // Agregar información de los exámenes al PDF
      selectedTests.forEach((test, index) => {
        const examData = `Examen ${index + 1}: ${test}`;
        doc.text(examData, 10, yOffset);
        yOffset += 10;
  
        // Agregar resultados del examen
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
            doc.text("Valores del análisis:", 10, yOffset);
            yOffset += 7;
            doc.text("Estado:", 10, yOffset);
           
            const selectOptions = ["Positivo", "Negativo"];
            const selectedOption = selectOptions[Math.floor(Math.random() * selectOptions.length)];
            doc.text(selectedOption, 25, yOffset);
            yOffset += 10; 
            break;
          case 'Enzimas Cardiacas':
            doc.text("Valores del análisis: ", 10, yOffset);
            yOffset += 7;
            doc.text(`CK: ${document.querySelector('#CK').value}`, 10, yOffset);
            yOffset += 7;
            doc.text(`CKMH: ${document.querySelector('#CKMH').value}`, 10, yOffset);
            yOffset += 7;
            doc.text(`Troponina: ${document.querySelector('#Troponina').value}`, 10, yOffset);
            yOffset += 10;
            break;         
          case 'Hematología':
              doc.text("Valores del análisis:", 10, yOffset);
              yOffset += 7;
              // Añadir resultados de los exámenes de hematología
              doc.text("Hemoglobina: " + document.querySelector('#Hemoglobina').value, 10, yOffset);
              yOffset += 7;
              doc.text("Hematocritos: " + document.querySelector('#Hematocritos').value, 10, yOffset);
              yOffset += 7;
              doc.text("CHCM: " + document.querySelector('#CHCM').value, 10, yOffset);
              yOffset += 7;
              doc.text("Glóbulos blancos: " + document.querySelector('#GlobulosBlancos').value, 10, yOffset);
              yOffset += 7;
              doc.text("Plaquetas: " + document.querySelector('#Plaquetas').value, 10, yOffset);
              yOffset += 7;
              doc.text("Neotrofilos: " + document.querySelector('#Neotrofilos').value + "%", 10, yOffset);
              yOffset += 7;
              doc.text("Linfocitos: " + document.querySelector('#Linfocitos').value + "%", 10, yOffset);
              yOffset += 7;
              doc.text("Monocitos: " + document.querySelector('#Monocitos').value + "%", 10, yOffset);
              yOffset += 7;
              doc.text("Eosinofilos: " + document.querySelector('#Eosinofilos').value + "%", 10, yOffset);
              yOffset += 7;
              doc.text("Basofilos: " + document.querySelector('#Basofilos').value + "%", 10, yOffset);
              yOffset += 10;
              break;
          case 'Prueba de Orina':
                doc.text("Valores del análisis:", 10, yOffset);
                yOffset += 7;
                
                // Añadir resultados de la prueba de orina
                doc.text("Color: " + document.querySelector('#Color').value, 10, yOffset);
                yOffset += 7;
                doc.text("Proteinas: " + document.querySelector('#Proteinas').value, 10, yOffset);
                yOffset += 7;
                doc.text("Glucosa: " + document.querySelector('#Glucosa').value, 10, yOffset);
                yOffset += 7;
                doc.text("Hemoglobina: " + document.querySelector('#Hemoglobina').value, 10, yOffset);
                yOffset += 7;
                doc.text("PH: " + document.querySelector('#PH').value, 10, yOffset);
                yOffset += 7;
                doc.text("Hematies: " + document.querySelector('#Hematies').value, 10, yOffset);
                yOffset += 7;
                doc.text("Densidad: " + document.querySelector('#Densidad').value, 10, yOffset);
                yOffset += 7;
                doc.text("Cantidad: " + document.querySelector('#Cantidad').value, 10, yOffset);
                yOffset += 7;
                
                doc.text("Nitritos: " + document.querySelector('#Nitritos').options[document.querySelector('#Nitritos').selectedIndex].text, 10, yOffset);
                yOffset += 7;
                doc.text("Bilirrubina: " + document.querySelector('#Bilirrubina').options[document.querySelector('#Bilirrubina').selectedIndex].text, 10, yOffset);
                yOffset += 7;
                doc.text("Urobilina: " + document.querySelector('#Urobilina').options[document.querySelector('#Urobilina').selectedIndex].text, 10, yOffset);
                yOffset += 7;
                doc.text("Pig. Bili: " + document.querySelector('#PigBili').options[document.querySelector('#PigBili').selectedIndex].text, 10, yOffset);
                yOffset += 7;
                doc.text("Cetona: " + document.querySelector('#Cetona').options[document.querySelector('#Cetona').selectedIndex].text, 10, yOffset);
                yOffset += 7;
                doc.text("Cristales: " + document.querySelector('#Cristales').options[document.querySelector('#Cristales').selectedIndex].text, 10, yOffset);
                yOffset += 7;
                doc.text("Bacterias: " + document.querySelector('#Bacterias').options[document.querySelector('#Bacterias').selectedIndex].text, 10, yOffset);
                yOffset += 7;
                doc.text("Mucina: " + document.querySelector('#Mucina').options[document.querySelector('#Mucina').selectedIndex].text, 10, yOffset);
                yOffset += 10;
                break;   
          case 'Prueba de Heces':
                  doc.text("Valores del análisis:", 10, yOffset);
                  yOffset += 7;
                  
                  // Añadir resultados de la prueba de heces
                  doc.text("Color: " + document.querySelector('#ColorHeces').value, 10, yOffset);
                  yOffset += 7;
                  doc.text("Olor: " + document.querySelector('#OlorHeces').value, 10, yOffset);
                  yOffset += 7;
                  doc.text("Aspecto: " + document.querySelector('#AspectoHeces').value, 10, yOffset);
                  yOffset += 7;
                  doc.text("Consistencia: " + document.querySelector('#ConsistenciaHeces').value, 10, yOffset);
                  yOffset += 7;
                  doc.text("Reacción: " + document.querySelector('#ReaccionHeces').value, 10, yOffset);
                  yOffset += 7;
                  
                  const selectedSangreHeces = document.querySelector('#SangreHeces').options[document.querySelector('#SangreHeces').selectedIndex].text;
                  doc.text("Sangre: " + selectedSangreHeces, 10, yOffset);
                  yOffset += 7;
                  
                  const selectedMocoHeces = document.querySelector('#MocoHeces').options[document.querySelector('#MocoHeces').selectedIndex].text;
                  doc.text("Moco: " + selectedMocoHeces, 10, yOffset);
                  yOffset += 7;
                  
                  const selectedDetritosHeces = document.querySelector('#DetritosHeces').options[document.querySelector('#DetritosHeces').selectedIndex].text;
                  doc.text("Detritos: " + selectedDetritosHeces, 10, yOffset);
                  yOffset += 10;
                  break;             
          case 'VSG':
            doc.text("Valores del análisis:", 10, yOffset);
            yOffset += 7;
                    
            doc.text("Eritrosedimentación: " + document.querySelector('#Eritrosedimentacion').value + " mm/1h", 10, yOffset);
            yOffset += 10;
          break;        
          case 'PCR':
          doc.text("Valores del análisis:", 10, yOffset);
          yOffset += 7;
          doc.text("PCR: " + document.querySelector('#PCR').value + " mg/L", 10, yOffset);
          yOffset += 7;
          doc.text("Valor de referencia: Hasta 6,0 mg/L", 10, yOffset);
          yOffset += 10;
          break;
          case 'PT, PTT':
          doc.text("Valores del análisis:", 10, yOffset);
          yOffset += 7;
          doc.text("PT: " + document.querySelector('#PT').value, 10, yOffset);
          yOffset += 7;
          doc.text("PTT: " + document.querySelector('#PTT').value, 10, yOffset);
          yOffset += 10;
          break;
          case 'Química Sanguínea':
          doc.text("Valores del análisis:", 10, yOffset);
          yOffset += 7;
        
          doc.text("Glucosa: " + document.querySelector('#Glucosa').value + " mg/dL", 10, yOffset);
          yOffset += 7;
          doc.text("Colesterol: " + document.querySelector('#Colesterol').value + " mg/dL", 10, yOffset);
          yOffset += 7;
          doc.text("Creatinina: " + document.querySelector('#Creatinina').value + " mg/dL", 10, yOffset);
          yOffset += 7;
          doc.text("Urea: " + document.querySelector('#Urea').value + " mg/dL", 10, yOffset);
          yOffset += 7;
          doc.text("Trigliceridos: " + document.querySelector('#Trigliceridos').value + " mg/dL", 10, yOffset);
          yOffset += 7;
          doc.text("Bilirrubina: " + document.querySelector('#Bilirrubina').value + " mg/dL", 10, yOffset);
          yOffset += 10;
          break;
          case 'Grupo Sanguíneo':
          doc.text("Valores del análisis:", 10, yOffset);
          yOffset += 7;
          
          // Obtener el valor seleccionado del campo de selección
          var grupoSanguineoSelect = document.querySelector('#grupoSanguineo');
          var grupoSanguineo = grupoSanguineoSelect.options[grupoSanguineoSelect.selectedIndex].text;

          // Añadir resultados de Grupo Sanguíneo
          doc.text("Grupo sanguíneo: " + grupoSanguineo, 10, yOffset);
          yOffset += 10;
          break;


          default:
            break;
        }
      });
  
      
  
      // Guardar el PDF con el nombre 'examenes.pdf'
      doc.save('examenes.pdf');
      axios.post('http://localhost:3001/lab', { template, patient: selectedPatientData })
        .then(() => {
          console.error('¡Éxito!');
        })
        .catch((error) => {
          console.error('Error', error);
        });
  
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
            {['Prueba de HIV', 'Enzimas Cardiacas', 'Prueba de Embarazo', 'Urocultivo', 'Antidoping', 'Dengue', 'VDRL', 'Prueba de COVID', 'Grupo Sanguíneo', 'Hematología', 'Prueba de Orina', 'Prueba de Heces', 'PT, PTT', 'Exudado Faringeo', 'PCR', 'Hepatitis B', 'VSG', 'Química Sanguínea'].map(test => (
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
