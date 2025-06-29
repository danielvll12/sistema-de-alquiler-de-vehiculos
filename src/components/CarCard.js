import React from 'react';
import { getUserRole } from '../utils/auth';

const CarCard = ({ car, onSelectCar, onDeleteCar }) => {
  const role = getUserRole();

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-200"
      onClick={() => onSelectCar(car)}
    >
      <img
        src={car.imageUrl}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {car.brand} {car.model} ({car.year})
        </h3>
        <p className="text-gray-700 mb-4">{car.location}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">
            ${car.pricePerDay}
            <span className="text-base font-normal text-gray-600">/semanal</span>
          </span>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation(); // No abrir modal
                onSelectCar(car);
              }}
              className="bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-gray-700 transition-colors text-lg"
            >
              Ver Detalles
            </button>

            {/* Mostrar solo si el usuario es admin y existe onDeleteCar */}
            {role === 'admin' && onDeleteCar && (
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if (window.confirm(`¿Eliminar vehículo ${car.brand} ${car.model}?`)) {
                    await onDeleteCar(car.id);
                  }
                }}
                className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition-colors text-lg"
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
