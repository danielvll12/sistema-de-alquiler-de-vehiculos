import React from 'react';
import { getUserRole } from '../utils/auth';

const CarCard = ({ car, onSelectCar, onDeleteCar }) => {
  const role = getUserRole();

  return (
    <div
      className="
        bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200
        overflow-hidden cursor-pointer transform transition-all duration-300
        hover:scale-[1.04] hover:shadow-2xl
      "
      onClick={() => onSelectCar(car)}
    >
      {/* Imagen */}
      <img
        src={car.imageUrl}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-52 object-cover transition duration-300 hover:brightness-90"
      />

      <div className="p-6 space-y-3">

        {/* Título */}
        <h3 className="text-2xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
          {car.brand} {car.model} —
          <span className="text-blue-600 font-bold"> {car.year}</span>
        </h3>

        {/* Ubicación */}
        <p className="text-gray-600 text-lg font-medium">{car.location}</p>

        {/* Precio + Acciones */}
        <div className="flex justify-between items-center pt-2">
          
          {/* Precio destacado */}
          <span className="text-3xl font-bold text-gray-900">
            ${car.pricePerDay}
            <span className="block text-sm text-gray-500 font-normal">/ semanal</span>
          </span>

          {/* Botones */}
          <div className="flex gap-2">

            {/* Ver detalles */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectCar(car);
              }}
              className="
                bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl
                shadow-md font-semibold transition-all hover:scale-105 text-base
              "
            >
              Ver detalles
            </button>

            {/* Botón eliminar SOLO ADMIN */}
            {role === 'admin' && onDeleteCar && (
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if (window.confirm(`¿Eliminar vehículo ${car.brand} ${car.model}?`)) {
                    await onDeleteCar(car.id);
                  }
                }}
                className="
                  bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl 
                  shadow-md font-semibold transition-all hover:scale-105 text-base
                "
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
