import React from 'react';

function ListaPrecios() {
  // Array de objetos que contiene los nombres de los exámenes y sus precios
  const precios = [
    { examen: 'VDRL', precio: 3 },
    { examen: 'Prueba de Orina', precio: 2 },
    { examen: 'Prueba de HIV', precio: 3 },
    { examen: 'Hematología', precio: 4 },
    { examen: 'Prueba de Heces', precio: 3 },
    { examen: 'Prueba de Embarazo', precio: 2 },
    { examen: 'Prueba de COVID', precio: 10 },
    { examen: 'Urocultivo', precio: 7 },
    { examen: 'Antidoping', precio: 9 },
    { examen: 'PT, PTT', precio: 5 },
    { examen: 'PCR', precio: 4 },
    { examen: 'Enzimas Cardiacas', precio: 9 },
    { examen: 'Exudado Faringeo', precio: 4 },
    { examen: 'Dengue', precio: 5 },
    { examen: 'VSG', precio: 4 },
    { examen: 'Grupo Sanguíneo', precio: 3 },
    { examen: 'Hepatitis B', precio: 6 },
    { examen: 'VSG', precio: 3 },
    { examen: 'Química Sanguínea', precio: 10 },
  ];

  return (
    // Contenedor principal de la lista de precios
    <div className="flex justify-center">
      <div className="w-full max-w-md bg-white p-8 mb-14 rounded-lg shadow-xl cursor-default">
        <h2 className="text-2xl mb-4 text-center font-bold ">Lista de Precios</h2>
        {precios.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between hover:text-teal-600">
              <span>{item.examen}</span>
              <span>${item.precio}</span>
            </div>
            {index !== precios.length - 1 && <hr className="my-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaPrecios;
